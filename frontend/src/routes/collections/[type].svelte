<script context="module" lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import type { ProductCollection } from '@chec/commerce.js/features/products';
	import type { Product } from '@chec/commerce.js/types/product';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const type: string = params.type;
		const categories = await commerce.categories.list();
		const products = await commerce.products.list({ category_slug: [type] });

		return {
			props: {
				categories,
				products: products.data,
				type
			}
		};
	};

	namespace Product {
		interface ProductItem  {
			itemMeta: string[];
		}
	}
</script>

<script lang="ts">
	import Filter from '$lib/components/filter/Filter.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import ProductHeader from '$lib/components/global/ProductHeader.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { savedItems } from '$lib/stores/cart';

	export let products: Product[];
	export let type: string;

	let filters: string[] = [];
	
	products = products.map((prod) => {
		prod['itemMeta'] = [
			...prod.categories.flatMap((cat) => cat.slug),
			...prod.variant_groups.flatMap((vari) =>
				vari.options.flatMap((option) => option.name.toLowerCase())
			)
		];
		return prod;
	});

	$: filteredProducts =
		filters.length >= 1
			? products.filter((prod) => {
					return filters.some((filter) => {
						return (prod['itemMeta'] as string[]).includes(filter);
					});
			  })
			: products;

	$: console.log(products);
	$: console.log('FIltered products', filteredProducts);
</script>

<ProductHeader subtitle="Mens" title={type} />

<section class="container container--lg">
	<div class="filter">
		<Filter bind:filters />
	</div>

	<div class="products">
		{#each filteredProducts || products as item}
			<ProductCard
				thumbnail={item.image.url}
				price={parseInt(item.price.raw.toString())}
				title={item.name}
				id={item.id}
				saved={Boolean($savedItems.find((items) => items.id === item.id))}
			/>
		{/each}
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
