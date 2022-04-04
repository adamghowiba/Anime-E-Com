<script lang="ts">
	import { cartItems } from '$lib/stores/cart';
	import { savedItems } from '$lib/stores/wishlist';
	import type { SelectedVariant, VariantGroup } from '$lib/types/interface';
	import { generateProductId } from '$lib/utils/numberUtils';
	import Alert from '../global/Alert.svelte';
	import QuanityTicker from '../global/QuanityTicker.svelte';

	type ItemType = 'cart' | 'wishlist';

	export let thumbnail: string;
	export let title: string;
	export let price: number;
	export let itemType: ItemType;
	export let variants: SelectedVariant[] = [];
	export let id: string = null;
	export let productId: string;
	export let quantity: number;

	function handleAddToCart() {
		savedItems.removeItem(productId);

		cartItems.addItem({
			id: 'awdawd1',
			// id: generateProductId(productId, variants),
			productId,
			price,
			title,
			thumbnail,
			quanity: 1
		});
	}

	function removeQuantity() {
		if (quantity == 0) return;
		cartItems.updateItem(id, { quanity: --quantity });
	}

	function addQuantity() {
		cartItems.updateItem(id, { quanity: ++quantity });
	}

	console.log(variants);

	$: items = itemType == 'cart' ? cartItems : savedItems;
</script>

<div class="item">
	<img class="item__image" src={thumbnail} alt="" />

	<div class="item__info">
		<h5>{title}</h5>

		<div class="item__variants">
			{#if itemType == 'cart' && Object.keys(variants).length >= 1}
				{#each variants as variant}
					<span>{variant.groupName}: {variant.optionName}</span>
				{/each}
			{/if}
			<span class="item__price">${price}</span>
		</div>

		<div class="item__actions">
			{#if itemType == 'wishlist'}
				<button on:click={() => items.removeItem(productId)}>Remove</button>
				<span>|</span>
				<button on:click={handleAddToCart}>Add To Cart</button>
			{:else}
				<QuanityTicker {quantity} on:add={addQuantity} on:remove={removeQuantity} />
				<button on:click={() => items.removeItem(id)}>Remove</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--color-gray-s2);
		min-height: 120px;

		h5 {
			font-size: var(--text-base);
			text-transform: capitalize;
		}

		span {
			display: block;
			// font-size: var(--text-sm);
			text-transform: capitalize;
		}

		&__image {
			width: 90px;
			// height: 125px;
			height: 100%;
			object-fit: contain;
		}

		&__info {
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
