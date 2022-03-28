<script lang="ts">
import { savedItems } from "$lib/stores/cart";


	type ItemType = 'cart' | 'saved';

	export let thumbnail: string;
	export let title: string;
	export let price: number;
	export let itemType: ItemType;
	export let variants: { [key: string]: string } = {};
	export let id: string;
</script>

<div class="item">
	<img class="item__image" src={thumbnail} alt="" />

	<div class="item__info">
		<h5>{title}</h5>

		<div class="item__variants">
			{#if itemType == 'cart' && Object.keys(variants).length >= 1}
				{#each Object.entries(variants) as [key, value]}
					<span>{key}: {value}</span>
				{/each}
			{/if}
			<span>${price}</span>
		</div>

		<div class="item__actions">
			<button on:click={() => savedItems.removeItem(id)}>Remove</button>
			<span>|</span>
			<button>Add To Cart</button>
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
		}

		&__image {
			width: 90px;
			// height: 125px;
			height: 100%;
			object-fit: cover;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 7px;
		}

		&__variants {
			display: flex;
			flex-direction: column;
			gap: 7px;
			font-size: var(--text-sm);
			margin-bottom: 4px;
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

		span {
			display: block;
			font-size: var(--text-sm);
			text-transform: capitalize;
		}
	}
</style>
