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
		if ($cartCount > 0) loadCartContents();
	}
</script>

<ProductDrawer
	drawerType="cart"
	itemCount={$cartCount}
	subtotal={cartData?.subtotal?.formatted_with_symbol}
	on:click={() => dispatch('cartClosed')}
>
	{#if !cartContents}
		{#each Array($cartCount) as _}
			<CartItemSkeleton />
		{/each}
	{:else}
		{#each cartContents as item}
			<CartItem
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
	{/if}
</ProductDrawer>

<style lang="scss">
</style>
