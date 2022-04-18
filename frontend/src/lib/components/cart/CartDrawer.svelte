<script lang="ts">
	import { removeItemFromCart } from '$lib/commerce/cartUtils';
	import { commerce } from '$lib/commerce/commerce';
	import { sanitizeLineItems } from '$lib/commerce/commerceUtils';
	import { alerts } from '$lib/stores/alerts';
	import { cartCount } from '$lib/stores/cart-store';
	import type { Cart } from '@chec/commerce.js/types/cart';
	import type { LineItem } from '@chec/commerce.js/types/line-item';
	import { createEventDispatcher } from 'svelte';
	import SquareButton from '../buttons/SquareButton.svelte';
	import CartItem from '../product/CartItem.svelte';
	import CartItemSkeleton from '../skeleton/CartItemSkeleton.svelte';
	import ProductDrawer from './ProductDrawer.svelte';

	/* 
		TODO: Add some form of animation or make price update instantly.
	*/

	let cartContents: LineItem[];
	let cartData: Cart;
	$: subtotal = cartData?.subtotal?.formatted_with_symbol;

	const dispatch = createEventDispatcher();

	function refreshCartSubtotal({ detail }) {
		subtotal = detail;
	}

	async function loadCartContents() {
		const cartId = commerce.cart.id();
		cartData = await commerce.cart.retrieve(cartId);
		cartContents = cartData.line_items;
		const invalidItems = await sanitizeLineItems(cartData.line_items);

		if (invalidItems) alerts.addAlert('Item in cart has been removed from the store.', 'warning');
	}

	async function handleRemove(lineItemId: string) {
		cartContents = cartContents.filter((item) => item.id !== lineItemId);
		const updatedCart = await removeItemFromCart(lineItemId);

		subtotal = updatedCart.cart.subtotal.formatted_with_symbol;
	}

	$: {
		loadCartContents();
	}
</script>

<ProductDrawer
	drawerType="cart"
	itemCount={$cartCount}
	{subtotal}
	on:click={() => dispatch('cartClosed')}
>
	{#if cartContents}
		{#each cartContents as item}
			{#if item.permalink}
				<CartItem
					product={item}
					bind:quantity={item.quantity}
					on:quantityUpdated={refreshCartSubtotal}
					on:handleRemove={() => handleRemove(item.id)}
				/>
			{/if}
		{/each}
	{:else}
		{#each Array($cartCount) as _}
			<CartItemSkeleton />
		{/each}
	{/if}
</ProductDrawer>

<style lang="scss">
</style>
