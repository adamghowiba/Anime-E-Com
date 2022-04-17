<script context="module" lang="ts">
	import { getCategoriesPresent, getProductsByType, sortBy } from '$lib/commerce/collectionUtils';
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
	import { gsap } from 'gsap';

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
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';

	export let type: string;

	let products: Product[];
	let selectedFilters: string[] = [];
	let filterOptions: Category[];

	let isFilterOpen: boolean = true;
	let filterElement: HTMLElement;

	type SortValue = 'newest' | 'price: high-low' | 'price: low-high';
	let sortValues: SortValue[] = ['newest', 'price: high-low', 'price: low-high'];
	let sortValue: SortValue;

	$: console.log(sortValue);

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

		// Make sure store doesn't get while navigating during loading.
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

	/* TODO: Should this be done when the first subscriber initaites */
	async function getLocalCategories() {
		if ($categoriesStore) return $categoriesStore;

		const categories = await commerce.categories.list();
		$categoriesStore = categories.data;

		return categories.data;
	}

	/**
	 * Set the filter options to be the categories present.
	 */
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

	function handleHideFilter() {
		gsap.to(filterElement, {
			marginLeft: isFilterOpen ? '-290px' : '0px',
			duration: 0.4
		});

		isFilterOpen = !isFilterOpen;
	}

	function slideIn(node: HTMLElement) {
		const tween = gsap.from(node, {
			marginLeft: '-250px',
			duration: 0.4
		});

		return {
			duration: tween.totalDuration() * 1000,
			tick: (t) => {
				tween.progress(t);
			}
		};
	}

	function sortProducts(sortValue: SortValue) {
		if (!sortValue || !products) return;

		const sortMap = new Map<SortValue, { type: 'price' | 'date'; order: 'asc' | 'desc' }>();

		sortMap.set('newest', { type: 'date', order: 'asc' });
		sortMap.set('price: high-low', { type: 'price', order: 'asc' });
		sortMap.set('price: low-high', { type: 'price', order: 'desc' });

		products = sortBy(products, { ...sortMap.get(sortValue) });
	}

	$: sortProducts(sortValue);
	$: getProductsFromStore(type);
	$: filteredProducts = getFilteredProducts(selectedFilters) || products;
</script>

<CollectionHeader subtitle="Collection" title={type} />

<section class="container container--lg" class:close={!isFilterOpen}>
	{#if filterOptions}
		<div class="filter" bind:this={filterElement} in:slideIn>
			<Filter {filterOptions} bind:selectedFilters />
		</div>
	{/if}

	<div class="products-wrap">
		<div class="products__actions">
			<SquareButton buttonColor="transparent" icon="ci:slider-01" on:click={handleHideFilter}>
				Hide Filter
			</SquareButton>

			<SelectInput bind:value={sortValue} values={sortValues} name="sort_by" />
		</div>

		<div class="products">
			{#if products}
				{#each filteredProducts as item}
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
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		justify-content: stretch;
		gap: 2rem;
		margin: 0 auto;
		transition: margin-left 0.25s ease-out;
	}

	.filter {
		width: 250px;
		flex-shrink: 0;
	}

	.products {
		display: grid;
		width: 100%;
		gap: 1.5rem;
		row-gap: 3rem;
		grid-template-columns: repeat(3, 1fr);

		&__actions {
			display: flex;
		}
	}
	.products-wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: end;
	}

	/* Laptop */
	@media screen and (max-width: 1024px) {
		section {
			grid-template-columns: 1fr;
		}
		.filter {
			display: none;
		}
	}

	/* Tablet */
	@media screen and (max-width: 768px) {
	}

	/* Phone - Tablet */
	@media screen and (max-width: 540px) {
		.products {
			grid-template-columns: repeat(2, 1fr);
			row-gap: 3rem;
		}
	}
</style>
