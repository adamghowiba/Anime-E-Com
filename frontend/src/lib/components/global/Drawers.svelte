<script lang="ts">
	import { cartItems } from '$lib/stores/cart';
	import { savedItems } from '$lib/stores/wishlist';
	import { createEventDispatcher } from 'svelte';
	import CartItem from '../product/CartItem.svelte';
	import ProductDrawer from './ProductDrawer.svelte';

	export let wishlistExpanded: boolean = false;
	export let cartExpanded: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<!-- Saved Drawer -->
{#if wishlistExpanded}
	<ProductDrawer
		itemCount={$savedItems.length}
		drawerType="saved"
		on:click={() => dispatch('wishlistClosed')}
	>
		{#each $savedItems as item}
			<CartItem
				itemType="wishlist"
				price={item.price}
				thumbnail={item.thumbnail}
				title={item.title}
				productId={item.productId}
				quantity={1}
			/>
		{/each}
	</ProductDrawer>
{:else if cartExpanded}
	<ProductDrawer
		drawerType="cart"
		itemCount={$cartItems.length}
		on:click={() => dispatch('cartClosed')}
	>
		{#each $cartItems as item}
			<CartItem
				itemType="cart"
				price={item.price}
				thumbnail={item.thumbnail}
				title={item.title}
				id={item.id}
				productId={item.productId}
				quantity={item.quanity}
				variants={item.variants}
			/>
		{/each}
	</ProductDrawer>
{/if}
