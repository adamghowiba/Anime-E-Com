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
				products
			}
		};
	};
</script>

<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	export let products: ProductCollection;
	console.log(products);
</script>

<section class="container container--spaced">
	{#each products.data as item}
		<ProductCard
			imgSrc={item.image.url}
			price={parseInt(item.price.raw.toString())}
			title={item.name}
			sizes={item.variant_groups[0].options.reduce((acc, curr) => [...acc, curr.name], [])}
		/>
	{/each}
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
