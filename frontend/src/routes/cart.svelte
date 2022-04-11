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
	import { onMount } from 'svelte';
	import type { RemoveResponse } from '@chec/commerce.js/features/cart';

	let cartContents: LineItem[];
	let cartData: Cart;
	let checkoutData: CheckoutToken;

	let promoValue: string;
	let discount: CheckDiscountResponse;
	let discountError: string;

	async function getCartContents() {
		const cartId = commerce.cart.id();
		cartData = await commerce.cart.retrieve(cartId);
		cartContents = cartData.line_items;

		checkoutData = await commerce.checkout.generateToken(cartId, { type: 'cart' });

		console.log(cartData);
		console.log(cartContents);
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

		cartContents =  removedResponse.cart.line_items;
	}

	async function testCheckout() {
		const cartId = commerce.cart.id();
		const checkout = await commerce.checkout.generateToken(cartId, { type: 'cart' });

		console.log('Checking out with', checkout.id);
		const capture = await commerce.checkout.capture(checkout.id, {
			customer: {
				email: 'adamware99@hotmail.com',
				firstname: 'Adam',
				lastname: 'Ghowiba',
				phone: '4079246902'
			},
			shipping: {
				country: 'US',
				county_state: 'FL',
				postal_zip_code: '32714',
				street: '1020 Waverly Dr',
				town_city: 'Longwood',
				name: 'Adam Ghowiba'
			},
			payment: {
				gateway: 'test_gateway',
				card: {
					number: '4242 4242 4242 4242',
					expiry_month: '01',
					expiry_year: '2023',
					cvc: '123',
					postal_zip_code: '94103'
				}
			}
		});

		console.log(capture);
	}

	getCartContents();
</script>

<section class="cart container container--lg">
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
				<div class="summary">
					<h4>ORDER Summary</h4>
					{#if discount && discount.valid}
						<div class="summary__items">
							<div class="summary__item summary__item--subtotal">
								<span>Subtotal</span>
								<span>{discount.live.subtotal.formatted_with_symbol}</span>
							</div>
							<div class="summary__item summary__item--promo">
								<span>Discount ({discount.code})</span>
								<span class="summary__saved">- {discount.amount_saved.formatted_with_symbol}</span>
							</div>
							<hr />
						</div>
					{/if}
					<h6>
						TOTAL
						<span>
							{#if cartData}
								${cartData.subtotal.formatted_with_code}
							{:else}
								<Skeleton width="70px" height="7px" />
							{/if}
						</span>
					</h6>
				</div>
				<SquareButton
					buttonColor="black"
					justify="space-between"
					width="100%"
					outlined
					on:click={testCheckout}
				>
					Check out
				</SquareButton>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
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
	.summary {
		border: 1px solid var(--color-gray-s2);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 20px;
		font-weight: var(--fw-medium);
		text-transform: uppercase;

		&__items {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__item {
			display: flex;
			justify-content: space-between;
		}

		&__saved {
			color: var(--color-red);
		}

		hr {
			border: none;
			border-top: 1px solid gray;
			width: 100%;
		}

		h4 {
			font-weight: var(--fw-semibold);
		}

		h6 {
			font-size: var(--text-base);
			display: flex;
			width: 100%;
			justify-content: space-between;
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
