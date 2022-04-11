<script lang="ts">
	import { removeItemFromCart } from '$lib/commerce/cartUtils';
	import { commerce } from '$lib/commerce/commerce';
	import { cartCount } from '$lib/stores/cart-store';
	import type { Cart } from '@chec/commerce.js/types/cart';
	import type { LineItem } from '@chec/commerce.js/types/line-item';
	import { createEventDispatcher } from 'svelte';
	import SquareButton from '../buttons/SquareButton.svelte';
	import CartItem from '../product/CartItem.svelte';
	import CartItemSkeleton from '../skeleton/CartItemSkeleton.svelte';
	import ProductDrawer from './ProductDrawer.svelte';

	let cartContents: LineItem[];
	let cartData: Cart;

	const dispatch = createEventDispatcher();

	async function loadCartContents() {
		/* TODO: Remove console log */
		console.debug('Loading cart drawer contents...');

		const cartId = commerce.cart.id();
		cartData = await commerce.cart.retrieve(cartId);
		cartContents = cartData.line_items;
	}

	async function handleRemove(lineItemId: string) {
		cartContents = cartContents.filter((item) => item.id !== lineItemId);
		const itemRemoved = await removeItemFromCart(lineItemId);
	}

	$: {
		loadCartContents();
	}
</script>

<ProductDrawer drawerType="cart" itemCount={$cartCount} on:click={() => dispatch('cartClosed')}>
	{#if !cartContents}
		{#each Array($cartCount) as _}
			<CartItemSkeleton />
		{/each}
	{:else}
		{#each cartContents as item}
			<CartItem
				itemType="cart"
				price={item.price.raw}
				thumbnail={item.image.url}
				title={item.product_name}
				id={item.id}
				productId={item.product_id}
				quantity={item.quantity}
				variants={item.selected_options}
				on:handleRemove={() => handleRemove(item.id)}
			/>
		{/each}

		<!-- Todo: Choose betweeen Bottom Footer / normal position -->
		<!-- <footer class="footer" style="margin-top: auto; position: relative; top: -10px"> -->
		<footer class="footer">
			<div class="footer__total">
				<h6>total</h6>
				<h5 class="footer__price">
					{cartData.subtotal.formatted_with_symbol}
				</h5>
			</div>

			<div class="footer__actions">
				<SquareButton width="99%" outlined buttonColor="blue">Checkout</SquareButton>
				<SquareButton width="99%" href="/cart" outlined>Your Bag</SquareButton>
			</div>
		</footer>
	{/if}
</ProductDrawer>

<style lang="scss">
	.footer {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;

		&__total {
			text-transform: uppercase;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid var(--color-gray-s2);
			padding-bottom: 1rem;
		}

		&__actions {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__price {
			font-weight: var(--fw-semibold);
			font-size: 16px;
		}

		h6 {
			font-size: 14px;
		}
	}
</style>
