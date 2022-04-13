<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import CheckoutItem from '$lib/components/cart/CheckoutItem.svelte';
	import { loadingScreen, navbarMinimzed } from '$lib/stores/interface';
	import type { LineItem } from '@chec/commerce.js/types/line-item';
	import CartItemSkeleton from '$lib/components/skeleton/CartItemSkeleton.svelte';
	import { cartCount } from '$lib/stores/cart-store';
	import type { Cart } from '@chec/commerce.js/types/cart';
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	import Checkout from './checkout.svelte';
	import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
	import type { CheckDiscountResponse } from '@chec/commerce.js/features/checkout';
	import { beforeUpdate, onMount } from 'svelte';
	import type { RemoveResponse } from '@chec/commerce.js/features/cart';
	import OrderSummary from '$lib/components/order/OrderSummary.svelte';
	import type Commerce from '@chec/commerce.js';

	let cartContents: LineItem[];
	let cartData: Cart;
	let checkoutData: CheckoutToken;

	let promoValue: string;
	let discount: CheckDiscountResponse;
	let discountError: string;

	let isCartEmpty: boolean = false;

	/* TODO: Use same toke in checkout as cart */
	async function getCartContents() {
		const cartId = commerce.cart.id();

		try {
			cartData = await commerce.cart.retrieve(cartId);
			cartContents = cartData.line_items;
			checkoutData = await commerce.checkout.generateToken(cartId, { type: 'cart' });

			console.log(cartData);
			console.log(cartContents);
		} catch (error) {
			if (error.statusCode === 422) return (isCartEmpty = true);
			console.error(error);
		}
	}

	/* TODO: Bug when trying to apply discount but cart is generated 
		can we use the previously generated cart data some how?
	*/
	async function checkDiscountCode(code: string) {
		if (!promoValue) return (discountError = 'No promo code entered ');
		if (!checkoutData) return;

		$loadingScreen = true;
		const discountData = await commerce.checkout.checkDiscount(checkoutData.id, { code });
		if (!discountData.valid) return (discountError = 'Promor code is invalid or expired.');

		discount = discountData;

		/* Update Price After Discount */
		cartData.subtotal.formatted_with_code = discount.live.total.formatted_with_code;

		$loadingScreen = false;
		console.log(discount);
	}

	async function handleItemRemovedFromCart(event: { detail: RemoveResponse }) {
		const removedResponse = event.detail;

		cartContents = removedResponse.cart.line_items;
	}

	$: if ($cartCount >= 1) getCartContents();
	$: isCartEmpty = $cartCount <= 0;
</script>

<section class="cart container container--lg">
	{#if !isCartEmpty}
		<header>
			<h2>YOUR BAG</h2>

			<h5>TOTAL ({$cartCount} item{$cartCount == 1 ? '' : 's'})</h5>
			<a href="/collections/all-products">Continue Shopping</a>
		</header>

		<div class="cart__grid">
			<div class="cart__items">
				{#if cartContents}
					{#each cartContents as item}
						<CheckoutItem
							thumbnail={item.image.url}
							price={item.price.raw}
							quantity={item.quantity}
							title={item.name}
							lineItemId={item.id}
							selectedOptions={item.selected_options}
							productId={item.product_id}
							imgSize="215px"
							on:itemRemoved={handleItemRemovedFromCart}
						/>
					{/each}
				{:else}
					{#each Array($cartCount) as _}
						<CartItemSkeleton size="large" />
					{/each}
				{/if}
			</div>

			<div class="order" class:isNavExpanded={!$navbarMinimzed}>
				<div class="order__block order__block--promo">
					<TextInput
						label="Enter Promo Code"
						name=""
						bind:value={promoValue}
						size="large"
						error={discountError}
					/>
					<SquareButton
						buttonColor="black"
						justify="space-between"
						width="100%"
						outlined
						on:click={() => checkDiscountCode(promoValue)}
					>
						Submit
					</SquareButton>
				</div>

				<div class="order__block order__block--total">
					<OrderSummary {discount} total={cartData?.subtotal?.formatted_with_code} />
					<SquareButton
						buttonColor="black"
						justify="space-between"
						width="100%"
						outlined
						href="/checkout"
					>
						Check out
					</SquareButton>
				</div>
			</div>
		</div>
	{:else}
		<div class="empty-cart">
			<h4>Your bag is empty</h4>
			<p>Once you add something in your bag - it will appear here. Ready to get started?</p>
			<SquareButton outlined={true} href="/collections/all-products">Continue Shopping</SquareButton
			>
		</div>
	{/if}
</section>

<style lang="scss">
	.empty-cart {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		gap: 2rem;
		margin: 3rem 0;
		h4 {
			font-weight: var(--fw-bold);
			text-transform: uppercase;
		}

		p {
			max-width: 40ch;
		}
	}

	.order {
		top: 5.5rem;
		height: max-content;
		position: sticky;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		transition: top 0.25s ease-out;

		&.isNavExpanded {
			top: calc(5.5rem + 35px);
		}

		&__block {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
	.cart {
		display: grid;
		flex-direction: column;
		gap: 1.5rem;

		&__items {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
		&__grid {
			display: grid;
			grid-template-columns: 1fr 0.5fr;
			gap: 2rem;
		}
	}
	header {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			font-weight: var(--fw-bold);
			margin-bottom: 0.8rem;
		}
		h5 {
		}
		a {
			font-size: var(--text-xsm);
			text-transform: uppercase;
			text-decoration: underline;
		}
	}
</style>
