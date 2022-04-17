<script lang="ts" context="module">
	import { addItemToCart } from '$lib/commerce/cartUtils';
	import { commerce, isValidProduct } from '$lib/commerce/commerce';
	import ToggleList from '$lib/components/account/ToggleList.svelte';
	import Breadcrumbs from '$lib/components/global/Breadcrumbs.svelte';
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import ProductSlider from '$lib/components/product/ProductSlider.svelte';
	import { navbarLoading, navbarMinimzed } from '$lib/stores/interface';
	import type { Asset } from '@chec/commerce.js/types/asset';
	import type { Product } from '@chec/commerce.js/types/product';
	import type { SelectedVariant } from '@chec/commerce.js/types/selected-variant';
	import Icon from '@iconify/svelte';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, url }) => {
		const permaLink = params.product;
		const productData = await commerce.products.retrieve(permaLink, { type: 'permalink' });

		/* Fail if the product has no sizes */
		if (!isValidProduct(productData))
			return { status: 400, error: new Error('Invalid Product- Incomplete') };

		/* TODO Handle Error for not found product */
		console.log(productData);

		return {
			props: {
				productData
			}
		};
	};
</script>

<script lang="ts">
	import ProductOptions from '$lib/components/product-page/ProductOptions.svelte';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	export let productData: Product;

	let selectedVariants: { [group: string]: SelectedVariant & { assets: Asset[] } } = {};

	function addToCart() {
		addItemToCart(
			productData.id,
			Object.values(selectedVariants).reduce((acc, curr) => {
				acc[curr.group_id] = curr.option_id;
				return acc;
			}, {})
		);
	}

	/* 	function addToWishlist() {
		savedItems.addItem({
			price: productData.price.raw,
			title: productData.name,
			productId: productData.id,
			thumbnail: selectedColorThumbnail
		});
	} */

	onMount(() => {
		$navbarLoading = false;
	});

	$: selectedColorImages =
		selectedVariants?.color?.assets?.length > 0
			? [...selectedVariants.color.assets.map((asset) => asset.url)]
			: [...productData.assets.map(({ url }) => url)];
</script>

<header class="breadcrumbs container container--lg">
	<Breadcrumbs
		history={[
			{ href: '', name: 'Men' },
			{ href: '', name: 'Mens Clothing' }
		]}
	/>
</header>

<div class="mobile-title container container--lg">
	<h3 class="title">{productData.name}</h3>
	<h5 class="price">${productData.price.raw}</h5>
</div>

<section class="product container container--lg">
	<ProductSlider images={selectedColorImages} />

	<div class="details" class:extraTopSpace={!$navbarMinimzed}>
		<h3 class="title">{productData.name}</h3>
		<h5 class="price">${productData.price.raw}</h5>

		<ProductOptions {productData} bind:selectedVariants />

		<div class="details__actions">
			<SquareButton
				on:click={addToCart}
				buttonColor="black"
				justify="space-between"
				width="100%"
				disabled={Object.values(selectedVariants).length !== productData.variant_groups.length}
				outlined
			>
				Add to cart
			</SquareButton>

			<div class="details__actions-save" on:click>
				<Icon icon="ant-design:heart-outlined" width={20} height={20} color="black" />
			</div>
		</div>

		{#if productData.description}
			<ToggleList title="Description" width="100%">
				<p>
					{@html productData.description}
				</p>
			</ToggleList>
		{/if}

		<ToggleList title="Delivery & Returns" width="100%">
			<p>
				Free Standard delivery over 50€, Free Express delivery over 100€. Rest of Europe: Please
				refer to our delivery information .
			</p>
		</ToggleList>
	</div>
</section>

<style lang="scss">
	header {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.product {
		display: grid;
		grid-template-columns: 1fr 0.5fr;
		padding-bottom: 5rem;
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;
	}

	.details {
		position: sticky;
		top: 5rem;
		height: min-content;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		transition: top 0.25s linear;

		&.extraTopSpace {
			top: calc(5rem + 35px);
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 1rem;
			width: 100%;
			margin-top: 2rem;
		}

		&__actions-save {
			position: relative;
			top: 2px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid black;
			width: 56px;
			height: 52px;
		}

		&__actions-save:hover {
			background-color: var(--color-gray-s2);
			cursor: pointer;
		}
	}

	.title {
		max-width: 15ch;
		text-transform: capitalize;
		font-weight: var(--fw-regular);
		line-height: 1.3;
	}

	.price {
		font-weight: var(--fw-semibold);
	}

	.mobile-title {
		display: none;
	}

	/* Laptop */
	@media screen and (max-width: 1024px) {
		.product {
			grid-template-columns: 1fr 0.8fr;
		}
		.title {
			font-size: var(--text-lg);
		}
	}

	/* Tablet */
	@media screen and (max-width: 768px) {
		.product {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			gap: 2.5rem;
			padding: 0;
		}
		.breadcrumbs {
			padding-top: 30px;
			padding-bottom: 30px;
			margin: 0;
		}
		.mobile-title {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding-top: 0;
			padding-bottom: 25px;
		}
		.title {
			max-width: 20ch;
		}

		.details {
			padding: 0 1rem;
			position: relative;
			top: 0;

			.title,
			.price {
				display: none;
			}

			&.extraTopSpace {
				top: 0;
			}
		}
	}
</style>
