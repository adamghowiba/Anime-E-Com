<script lang="ts">
	import { overlay } from '$lib/stores/interface';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import CartItem from '../product/CartItem.svelte';
	import { fly, fade } from 'svelte/transition';
	import { savedItems } from '$lib/stores/wishlist';
	import Button from '../global/Button.svelte';

	export let drawerType: 'cart' | 'saved';
	export let itemCount: number;

	$: empty = itemCount <= 0;

	$: isCart = drawerType == 'cart';

	onMount(() => {
		// $overlay = true;
		// return () => {
		// 	$overlay = false;
		// };
	});
</script>

<!-- <div class="saved"> -->
<div class="drawer" in:fly={{ x: 400, duration: 250 }} out:fade={{ duration: 150 }}>
	<div class="drawer__header">
		<h5>
			{drawerType == 'saved' ? 'Saved Items ' : 'Cart '}<strong class="drawer__count"
				>({itemCount})</strong
			>
		</h5>

		<div class="drawer__exit" on:click>
			<Icon icon="bi:x-lg" width={17} height={17} />
		</div>

		<hr />
	</div>

	<div class="drawer__items">
		{#if empty}
			<div class="drawer__empty">
				<img
					src="/icons/{isCart ? 'cart' : 'wishlist'}_empty.svg"
					alt="Broken hearts for empty wishlist"
				/>

				<div class="drawer__empty__content">
					<h4>Your {isCart ? 'cart' : 'wishlist'} is empty</h4>
					<p>
						Any items that you {isCart ? 'add' : 'save'} while browsing will be added here, to your wishlist
					</p>
				</div>

				<div class="drawer__empty__buttons">
					<Button href="/collections/hoodies" buttonColor="black" width="300px"
						>Shop T-Shirts</Button
					>
					<Button href="/collections/hoodies" buttonColor="black" width="300px">Shop Hoodies</Button
					>
				</div>
			</div>
		{:else}
			<slot />
		{/if}
	</div>
</div>

<style lang="scss">
	.drawer {
		height: 100%;
		min-width: 440px;
		padding: 1rem;
		position: fixed;
		top: 0;
		z-index: 300;
		right: 0;
		display: flex;
		gap: 10px;
		flex-direction: column;
		gap: 1rem;
		background-color: white;

		&__header {
			position: relative;
			text-align: center;
			position: sticky;
			top: 0;
		}

		&__header h5 {
			font-size: 18px;
			margin-bottom: 1rem;
		}

		&__exit {
			position: absolute;
			right: 0;
			top: 0;
		}

		&__count {
			font-size: var(--text-sm);
			position: relative;
			top: -1px;
		}

		&__items {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			overflow-y: auto;
		}

		hr {
			border: none;
			border-top: 1px solid var(--color-gray-s2);
		}

		strong {
			font-weight: var(--fw-semibold);
		}
	}

	.drawer__empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		max-width: 80%;
		margin: 0 auto;

		&__buttons {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__content {
			text-align: center;
			margin-bottom: 12px;
			max-width: 30ch;
			display: flex;
			flex-direction: column;
			gap: 11px;
		}

		img {
			max-width: 300px;
		}

		h4 {
			font-weight: var(--fw-semibold);
		}

		p {
			line-height: 1.4;
		}
	}
</style>
