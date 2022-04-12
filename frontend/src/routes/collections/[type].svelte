<script context="module" lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import type { ProductCollection } from '@chec/commerce.js/features/products';
	import type { Product } from '@chec/commerce.js/types/product';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const type: string = params.type;

		return {
			props: {
				type
			}
		};
	};

	namespace Product {
		interface ProductItem {
			itemMeta: string[];
		}
	}
</script>

<script lang="ts">
	import Filter from '$lib/components/filter/Filter.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import CollectionHeader from '$lib/components/collection/CollectionHeader.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { savedItems } from '$lib/stores/wishlist';
	import { getProductsByType } from '$lib/commerce/collectionUtils';
	import ProductCardSkeleton from '$lib/components/skeleton/ProductCardSkeleton.svelte';
	import { onMount } from 'svelte';

	export let type: string;

	let products: Product[];
	let filters: string[] = [];

	async function getProductCollection() {
		const productData = await getProductsByType(type);

		products = addCategoriesToItemMeta(productData);
	}
	getProductCollection();

	/*  Adds the categories of the product to the itemMeta
		Makes it easier to search through a products catagories 
		to filter by
	*/
	function addCategoriesToItemMeta(products: Product[]) {
		let taggedProducts = products.map((prod) => {
			prod['itemMeta'] = [
				...prod.categories.flatMap((cat) => cat.slug),
				...prod.variant_groups.flatMap((vari) =>
					vari.options.flatMap((option) => option.name.toLowerCase())
				)
			];
			return prod;
		});

		return taggedProducts;
	}

	function getFilteredProducts(filters: string[]): Product[] {
		if (!products || filters.length <= 0) return;

		return products.filter((prod) => {
			return filters.some((filter) => {
				return (prod['itemMeta'] as string[]).includes(filter);
			});
		});
	}

	$: filteredProducts = getFilteredProducts(filters) || products;
	$: console.log('Filtered products', filteredProducts);
	$: console.log('Filters', filters);
</script>

<CollectionHeader subtitle="Mens" title={type} />

<section class="container container--lg">
	<div class="filter">
		<Filter bind:filters />
	</div>

	<div class="products">
		{#if products}
			{#each filteredProducts || products as item}
				<ProductCard
					thumbnail={item?.image?.url}
					price={parseInt(item.price.raw.toString())}
					title={item.name}
					productId={item.id}
					saved={Boolean($savedItems.find((items) => items.productId === item.id))}
				/>
			{/each}
		{:else}
			{#each Array(6) as _}
				<ProductCardSkeleton />
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 0.3fr 1fr;
		gap: 2rem;
		padding: 3rem 2rem;
		margin: 0 auto;
	}

	.products {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (max-width: 768px) {
		section {
			grid-template-columns: 1fr;
		}
		.filter {
			display: none;
		}
	}
</style>
