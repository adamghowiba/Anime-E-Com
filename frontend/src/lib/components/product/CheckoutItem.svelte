<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';

	import { cartItems } from '$lib/stores/cart';
	import { savedItems } from '$lib/stores/wishlist';
	import type { SelectedVariant } from '$lib/types/interface';
	import { generateProductId } from '$lib/utils/numberUtils';
	import { onMount } from 'svelte';
	import Alert from '../global/Alert.svelte';
	import QuanityTicker from '../global/QuanityTicker.svelte';

	/* Todo combine CheckoutItem & CartItem  */
	export let thumbnail: string;
	export let title: string;
	export let price: number;
	export let variants: { [key: string]: unknown } = {};
	export let selectedVariant: SelectedVariant[] = null;
	export let id: string = null;
	export let productId: string;
	export let quantity: number;

	/* Style Props */
	export let imgSize: string = '120px';

	async function handleAddToCart() {
		savedItems.removeItem(productId);

		// cartItems.addItem({
		// 	id: generateProductId(productId, variants),
		// 	productId,
		// 	price,
		// 	title,
		// 	thumbnail,
		// 	quanity: 1
		// });
	}

	onMount(async () => {
		const product = await commerce.products.retrieve(productId, {});
		console.log(product);
	});

	function removeQuantity() {
		if (quantity == 0) return;
		cartItems.updateItem(id, { quanity: --quantity });
	}

	function addQuantity() {
		cartItems.updateItem(id, { quanity: ++quantity });
	}

	$: items = cartItems;
</script>

<div class="item">
	<img class="item__image" src={thumbnail} alt="" style="--imgSize: {imgSize};" />

	<div class="info">
		<div class="info__header">
			<h5>{title}</h5>
			<span class="info__price">${price}</span>
		</div>

		<div class="info__variants">
			{#if selectedVariant}
				{#each selectedVariant as variant}
					<span>{variant.groupName}: {variant.optionName}</span>
				{/each}
			{:else}
				{#each Object.entries(variants) as [key, value]}
					<span>{key}: {value}</span>
				{/each}
			{/if}
			<span>QTY: {quantity}</span>
		</div>

		<div class="info__actions">
			<button on:click={() => items.removeItem(productId)}>Edit</button>
			<span>|</span>
			<button on:click={handleAddToCart}>Move To Wishlist</button>
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

		span {
			display: block;
			// font-size: var(--text-sm);
			text-transform: capitalize;
		}

		&__image {
			width: var(--imgSize, 90px);
			height: 100%;
			// height: 125px;
			object-fit: contain;
		}
	}
</style>
