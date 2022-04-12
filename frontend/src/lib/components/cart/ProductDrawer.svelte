<script lang="ts">
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import { cartCount } from '$lib/stores/cart-store';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from '../buttons/Button.svelte';
	import Skeleton from '../skeleton/Skeleton.svelte';

	export let drawerType: 'cart' | 'saved';
	export let itemCount: number;
	export let subtotal: string;

	$: empty = itemCount <= 0;
	$: isCart = drawerType == 'cart';
</script>

<div class="drawer" in:fly={{ x: 400, duration: 250 }} out:fade={{ duration: 150 }}>
	<div class="header">
		<h5>
			Cart <em>({itemCount})</em>
		</h5>

		<div class="header__exit" on:click>
			<Icon icon="bi:x-lg" width={17} height={17} />
		</div>
	</div>

	<div class="drawer__items">
		{#if empty}
			<div class="drawer__empty">
				<img
					src="/icons/{isCart ? 'cart' : 'wishlist'}_empty.svg"
					alt="Broken hearts for empty wishlist"
				/>

				<div class="drawer__empty__content">
					<h4>Your cart is empty</h4>
					<p>Any items that you add while browsing will be added here, to your wishlist</p>
				</div>

				<div class="drawer__empty__buttons">
					<SquareButton width="100%" size="small" outlined>Shop All Products</SquareButton>
					<SquareButton width="100%" size="small" buttonColor="gray" outlined>
						Shop Best Sellers
					</SquareButton>
				</div>
			</div>
		{:else}
			<slot />
		{/if}
	</div>

	{#if !empty}
		<footer class="footer">
			<div class="footer__total">
				<h6>total</h6>
				<h5 class="footer__price">
					{#if subtotal}
						{subtotal}
					{:else}
						<Skeleton width="40px" height="16px" />
					{/if}
				</h5>
			</div>

			<div class="footer__actions">
				<SquareButton width="99%" outlined buttonColor="blue" href="/checkout">
					Checkout
				</SquareButton>
				<SquareButton width="99%" href="/cart" outlined>Your Bag</SquareButton>
			</div>
		</footer>
	{/if}
</div>

<style lang="scss">
	.header {
		position: relative;
		text-align: center;
		box-shadow: 1px -2px 10px rgba(102, 102, 102, 0.281);
		border-bottom: 1px solid var(--color-gray-s1);

		h5 {
			font-size: 18px;
		}

		&__exit {
			position: absolute;
			right: 1.5rem;
			top: 1rem;
		}
	}

	.footer,
	.header {
		padding: 1rem 1.5rem;
	}

	.drawer {
		height: 100%;
		min-width: 550px;
		position: fixed;
		top: 0;
		z-index: 300;
		right: 0;
		display: flex;
		flex-direction: column;
		background-color: white;

		&__items {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			overflow-y: auto;
			height: 100%;
			width: 100%;
			padding: 1rem 1.5rem;
		}

		em {
			font-weight: var(--fw-semibold);
			font-size: var(--text-sm);
			position: relative;
			top: -1px;
		}
	}

	.footer {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
		border-top: 1px solid var(--color-gray-s1);
		padding: 1.5rem 1.5rem;

		&__total {
			text-transform: uppercase;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__actions {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__price {
			font-weight: var(--fw-semibold);
			font-size: 16px;
			position: relative;
			right: 9px;
		}

		h6 {
			font-size: 14px;
		}
	}

	.drawer__empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 80%;
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

	:global(body) {
		::-webkit-scrollbar {
			width: 6px;
		}

		::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.37);
			border-radius: 40px;
		}

		::-webkit-scrollbar-track {
			background-color: var(--color-gray-s1);
		}
	}
</style>
