<script context="module" lang="ts">
	import { getProductsByType } from '$lib/commerce/collectionUtils';
	import { commerce } from '$lib/commerce/commerce';
	import CollectionHeader from '$lib/components/collection/CollectionHeader.svelte';
	import Filter from '$lib/components/filter/Filter.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import ProductCardSkeleton from '$lib/components/skeleton/ProductCardSkeleton.svelte';
	import { categoriesStore } from '$lib/stores/categories-store';
	import { collectionStore } from '$lib/stores/collection-store';
	import { savedItems } from '$lib/stores/wishlist';
	import type { Category } from '@chec/commerce.js/types/category';
	import type { Product } from '@chec/commerce.js/types/product';
	import type { Load } from '@sveltejs/kit';
	import { children } from 'svelte/internal';

	export const load: Load = async ({ params }) => {
		const type: string = params.type;

		return {
			props: {
				type
			}
		};
	};
</script>

<script lang="ts">
	export let type: string;

	let products: Product[];
	let selectedFilters: string[] = [];
	let filterOptions: Category[];

	/* Get products from the svelte store than update with response.
	   Allows for quicker loading when navigating from collection-collection
	*/
	async function getProductsFromStore(collectionType: string) {
		if ($collectionStore[collectionType]) {
			products = $collectionStore[collectionType];
			await sanitizeCollectionFilters();
			return;
		}

		const productData = await getProductsByType(type);
		console.log(productData);

		/* Make sure store doesn't get while navigating during loading. */
		if (collectionType !== type) return;

		products = productData;
		collectionStore.setProductsForType(type, productData);
		await sanitizeCollectionFilters();
	}

	function getFilteredProducts(filters: string[]) {
		if (!products || filters.length <= 0) return;

		const filteredproducts = products.filter((product) => {
			return (
				product.categories.some((cat) => filters.includes(cat.slug)) ||
				product.variant_groups.some((group) =>
					group.options.some((option) => filters.includes(option.name))
				)
			);
		});

		return filteredproducts;
	}

	async function getLocalCategories() {
		if ($categoriesStore) return $categoriesStore;

		const categories = await commerce.categories.list();
		$categoriesStore = categories.data;

		return categories.data;
	}

	/* Return a set of the categories that are in the collection. */
	function getCategoriesPresent(products: Product[]) {
		const presentCatOptions = new Set<string>();

		products.forEach((product) => {
			product.categories.forEach((cat) => presentCatOptions.add(cat.slug));
		});

		return presentCatOptions;
	}

	/* Return the categories & their childern that are in the collection */
	async function sanitizeCollectionFilters() {
		const categories = await getLocalCategories();
		let categoryOptionsPresent = getCategoriesPresent(products);

		const collectionFilters = categories.map((val) => {
			return {
				...val,
				children: val.children.filter((cat) => categoryOptionsPresent.has(cat.slug))
			};
		});

		filterOptions = collectionFilters;
	}

	$: getProductsFromStore(type);
	$: filteredProducts = getFilteredProducts(selectedFilters) || products;
</script>

<CollectionHeader subtitle="Mens" title={type} />

<section class="container container--lg">
	<div class="filter">
		<Filter bind:selectedFilters {filterOptions} />
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
					permaLink={item.permalink}
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
