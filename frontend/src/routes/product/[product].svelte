<script lang="ts" context="module">
	import {
		commerce,
		isValidProduct,
		parseProductColors,
		parseProductSizes
	} from '$lib/commerce/commerce';
	import ToggleList from '$lib/components/account/ToggleList.svelte';
	import Breadcrumbs from '$lib/components/global/Breadcrumbs.svelte';
	import SquareButton from '$lib/components/global/SquareButton.svelte';
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import ProductSlider from '$lib/components/product/ProductSlider.svelte';
	import { alerts } from '$lib/stores/alerts';
	import { cartItems } from '$lib/stores/cart';
	import { navbarMinimzed } from '$lib/stores/interface';
	import { savedItems } from '$lib/stores/wishlist';
	import type { SelectedVariant, VariantGroup, VariantOption } from '$lib/types/interface';
	import { generateProductId } from '$lib/utils/numberUtils';
	import { unslugify } from '$lib/utils/stringUtils';
	import type { Product } from '@chec/commerce.js/types/product';
	import Icon from '@iconify/svelte';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ props, params, url }) => {
		const productId = url.searchParams.get('id');

		const productSlug = params.product;
		const productData = await commerce.products.retrieve(productId);

		/* Fail if the product has no sizes */
		if (!isValidProduct(productData)) return { error: new Error('Invalid Product- Incomplete') };

		/* TODO Handle Error for not found product */
		console.log(productData);

		return {
			props: {
				productSlug,
				productId,
				productData
			}
		};
	};
</script>

<script lang="ts">
	export let productSlug: string;
	export let productId: number;
	export let productData: Product;

	/* TODO Check for mistakes made on the backend. */
	// let sizeOptions = null;
	// let colorOptions = null;

	let sizeOptions = parseProductSizes(productData);
	let colorOptions = parseProductColors(productData);

	let productTitle = unslugify(productSlug);
	let selectedColor = colorOptions ? colorOptions.options[0] : null;
	let selectedSize: VariantOption;

	function addToCart() {
		const selectedVariant: SelectedVariant[] = [];

		if (selectedColor)
			selectedVariant.push({
				groupId: colorOptions.id,
				groupName: colorOptions.name,
				optionId: selectedColor.id,
				optionName: selectedColor.name
			});

		if (selectedSize)
			selectedVariant.push({
				groupId: sizeOptions.id,
				groupName: sizeOptions.name,
				optionId: selectedSize.id,
				optionName: selectedSize.name
			});

		cartItems.addItem({
			// id: generateProductId(productData.id, itemVariants),
			id: 'adwawd',
			productId: productData.id,
			price: productData.price.raw,
			quanity: 1,
			thumbnail: selectedColorThumbnail,
			title: productData.name,
			selectedVariant
		});
		alerts.addAlert('Added item to cart', 'success');
	}

	/* 	function addToWishlist() {
		savedItems.addItem({
			price: productData.price.raw,
			title: productData.name,
			productId: productData.id,
			thumbnail: selectedColorThumbnail
		});
	} */

	$: selectedColorThumbnail = selectedColor
		? selectedColor.assets[0].url
		: productData.assets[0].url;
	console.log(colorOptions);
</script>

<header class="container container--lg">
	<Breadcrumbs
		history={[
			{ href: '', name: 'Men' },
			{ href: '', name: 'Mens Clothing' }
		]}
	/>
</header>

<section class="product">
	<ProductSlider
		images={selectedColor
			? [...selectedColor.assets.map((asset) => asset.url)]
			: [...productData.assets.map(({ url }) => url)]}
	/>

	<div class="details" class:extraTopSpace={!$navbarMinimzed}>
		<h3 class="details__title">{productData.name}</h3>
		<h5 class="details__price">${productData.price.raw}</h5>

		{#if colorOptions}
			<div class="details__block">
				<h6>Color <span class="gray">{selectedColor.name ?? ''}</span></h6>

				<div class="details__block__color-options">
					<RadioGroup bind:value={selectedColor}>
						{#each colorOptions.options as color}
							<RadioInput
								name="size"
								value={color}
								height="100"
								border={selectedColor.name === color.name}
							>
								<img src={color.assets[0].url} alt="" />
							</RadioInput>
						{/each}
					</RadioGroup>
				</div>
			</div>
		{/if}

		{#if sizeOptions}
			<div class="details__block">
				<h6>Select Size</h6>

				<div class="details__block__size-options">
					<RadioGroup bind:value={selectedSize}>
						{#each sizeOptions.options as size}
							<RadioInput name="size" value={size}>{size.name.toUpperCase()}</RadioInput>
						{/each}
					</RadioGroup>
				</div>
			</div>
		{/if}

		<div class="details__actions">
			<SquareButton
				on:click={addToCart}
				buttonColor="black"
				justify="space-between"
				width="100%"
				disabled={sizeOptions ? !Boolean(selectedSize) : false}
				outlined
			>
				Add to cart
			</SquareButton>
			<!-- <div class="details__actions-save" on:click={addToWishlist}>
				<Icon icon="ant-design:heart-outlined" width={20} height={20} color="black" />
			</div> -->
		</div>
		<ToggleList title="Description" width="100%">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam totam delectus vel
				repellat obcaecati rem quisquam id, nam impedit eveniet, veniam quos natus excepturi
				consectetur modi consequuntur cum accusantium dolore.
			</p>
		</ToggleList>

		<ToggleList title="Delivery & Returns" width="100%">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam totam delectus vel
				repellat obcaecati rem quisquam id, nam impedit eveniet, veniam quos natus excepturi
				consectetur modi consequuntur cum accusantium dolore.
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
	}

	.details__block {
		display: flex;
		gap: 1rem;
		flex-direction: column;

		&__color-options {
			display: flex;
			gap: 7px;
		}

		h6 {
			text-transform: uppercase;
			font-weight: var(--fw-semibold);
		}
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

		&__title {
			max-width: 15ch;
			// margin-bottom: 2.5rem;
			text-transform: capitalize;
			font-weight: var(--fw-regular);
			line-height: 1.3;
		}

		&__price {
			font-weight: var(--fw-semibold);
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

	.gray {
		color: #6e6e6e;
		text-transform: capitalize;
	}
</style>
