<script lang="ts">
	import { savedItems } from '$lib/stores/wishlist';
	import type { SelectedVariant } from '@chec/commerce.js/types/selected-variant';
	import QuanityTicker from '$lib/components/buttons/QuanityTicker.svelte';
	import { createEventDispatcher } from 'svelte';
	import { updateQuanitity } from '$lib/commerce/cartUtils';

	export let thumbnail: string;
	export let title: string;
	export let price: number;
	export let variants: SelectedVariant[] = [];
	export let id: string = null;
	export let productId: string;
	export let permalink: string;
	export let quantity: number;

	/* Toggleable UI Elements */
	export let quantityTicker: boolean = true;
	export let removeAction: boolean = true;

	let updatingQuantity = false;

	const dispatch = createEventDispatcher();

	async function removeQuantity() {
		if (quantity == 0 || updatingQuantity) return;

		try {
			updatingQuantity = true;

			const cart = await updateQuanitity(id, --quantity);
			dispatch('quantityUpdated', cart.cart.subtotal.formatted_with_symbol);
		} finally {
			updatingQuantity = false;
		}
	}

	async function addQuantity() {
		if (updatingQuantity) return;

		try {
			updatingQuantity = true;
			const cart = await updateQuanitity(id, ++quantity);

			dispatch('quantityUpdated', cart.cart.subtotal.formatted_with_symbol);
		} finally {
			updatingQuantity = false;
		}
	}
</script>

<div class="item">
	<img class="item__image" src={thumbnail} alt="" />

	<div class="item__info">
		<a class="item__title" href="/product/{permalink}">{title}</a>

		<div class="item__variants">
			{#if variants.length >= 1}
				{#each variants as variant}
					<span>{variant.group_name}: {variant.option_name}</span>
				{/each}
			{/if}
			<span class="item__price">${price}</span>
		</div>

		<div class="item__actions">
			{#if quantityTicker}
				<QuanityTicker
					{updatingQuantity}
					{quantity}
					on:add={addQuantity}
					on:remove={removeQuantity}
				/>
			{/if}
			{#if removeAction}
				<button on:click={() => dispatch('handleRemove')}>Remove</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.item {
		display: flex;
		align-items: flex-start;
		gap: 1.5rem;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--color-gray-s2);

		span {
			display: block;
			// font-size: var(--text-sm);
			text-transform: capitalize;
		}

		&__title {
			font-size: var(--text-base);
			text-transform: capitalize;
		}

		&__image {
			width: 90px;
			height: 100px;
			object-position: 50%;
			object-fit: cover;
		}

		&__info {
			width: 100%;
			display: flex;
			flex-direction: column;
		}

		&__variants {
			display: flex;
			flex-direction: column;
			font-size: 12px;
			margin-bottom: 4px;
		}

		&__info,
		&__variants {
			gap: 10px;
		}

		&__actions {
			width: 100%;
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

			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
