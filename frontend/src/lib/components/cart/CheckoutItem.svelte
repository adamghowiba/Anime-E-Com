<script lang="ts">
	import { removeItemFromCart } from '$lib/commerce/cartUtils';
	import { loadingScreen } from '$lib/stores/interface';
	import type { SelectedVariant as SelectedOption } from '@chec/commerce.js/types/selected-variant';
	import { createEventDispatcher } from 'svelte';

	/* Todo combine CheckoutItem & CartItem  */
	export let thumbnail: string;
	export let title: string;
	export let price: number;
	export let selectedOptions: SelectedOption[] = null;
	export let lineItemId: string;
	export let productId: string;
	export let quantity: number;
	export let permalink: string;

	/* Style Props */
	export let imgSize: string = '120px';

	const dispatch = createEventDispatcher();

	async function removeFromCart() {
		$loadingScreen = true;

		const removedResponse = await removeItemFromCart(lineItemId);
		dispatch('itemRemoved', removedResponse);
		$loadingScreen = false;
	}

	function handleAddToWishlist() {}
</script>

<div class="item">
	<a href="/product/{permalink}" class="item__image">
		<img src={thumbnail} alt="" style="--imgSize: {imgSize};" />
	</a>

	<div class="info">
		<div class="info__header">
			<h5>{title}</h5>
			<span class="info__price">${price}</span>
		</div>

		<div class="info__variants">
			{#if selectedOptions}
				{#each selectedOptions as option}
					<span class="variant"> <span class="variant-group">{option.group_name}:</span> {option.option_name}</span>
				{/each}
			{/if}
			<span>QTY: {quantity}</span>
		</div>

		<div class="info__actions">
			<button on:click={handleAddToWishlist}>Move To Wishlist</button>
			<span>|</span>
			<button on:click={removeFromCart}>Remove</button>
		</div>
	</div>
</div>

<style lang="scss">
	.info {
		display: flex;
		flex-direction: column;
		padding: 1.3rem;
		width: 100%;
		gap: 1rem;

		h5 {
			font-size: 18px;
			text-transform: capitalize;
			font-weight: var(--fw-semibold);
		}

		&__variants {
			display: flex;
			flex-direction: column;
			font-size: 16px;
			margin-bottom: 4px;
			gap: 12px;
		}

		&__actions {
			display: flex;
			gap: 7px;
			font-weight: var(--fw-medium);
		}

		&__actions button {
			padding: 0;
			appearance: none;
			background-color: transparent;
			border: none;
			text-decoration: underline;
			font-weight: var(--fw-semibold);

			&:hover {
				cursor: pointer;
			}
		}

		&__header {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
	}

	.item {
		display: flex;
		border: 1px solid var(--color-gray-s2);
		min-height: 120px;

		img {
			max-width: 100%;
			display: block;
		}

		span {
			// font-size: var(--text-sm);
			text-transform: capitalize;
		}

		&__image {
			height: 100%;
			max-width: var(--imgSize, 30%);
		}
	}

	@media screen and (max-width: 540px) {
		.info__price, .info__actions {
			font-size: 13px ;
		}
		.info__variants {
			flex-direction: row;

			.variant::after {
				content: ' /';
			}
		}

		.variant-group {
			display: none;
		}
	}

	@media screen and (max-width: 768px) {
		.item__image {
			padding-top: 0.8rem;
		}

		.item {
			border: none;
		}

		.info {
			gap: 7px;
			padding: 0.8rem;

			&__header {
				gap: inherit;
				flex-direction: column;
			}
			&__variants {
				gap: inherit;
				font-size: 13px;
			}

			h5 {
				font-size: 16px;
			}

			&__actions {
				flex-direction: column;
				align-items: flex-start;
				gap: 5px;

				span {
					display: none;
				}
			}
		}

		.item__image,
		img {
			min-width: 80px;
			min-height: 80px;
		}
	}
</style>
