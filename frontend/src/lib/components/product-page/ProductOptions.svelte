<script lang="ts">
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import type { SelectedOption } from '$lib/types/types';
	import { transformSelectedVariants } from '$lib/utils/transforms';
	import type { Product } from '@chec/commerce.js/types/product';
	import { onMount } from 'svelte';

	export let productData: Product;
	export let selectedVariants: { [group: string]: SelectedOption } = {};

	/* TODO: Show tooltip for color hover */
	function setFirstColorOption() {
		const colorVariant = productData.variant_groups.find(
			(variant) => variant.name.toLowerCase() === 'color'
		);

		if (!colorVariant) return;

		selectedVariants.color = transformSelectedVariants(
			colorVariant,
			colorVariant.options[0],
			productData.assets
		);
	}

	onMount(() => {
		setFirstColorOption();
	});
</script>

{#each productData.variant_groups as group}
	{@const selectedVariant = selectedVariants[group.name]}
	{@const isColorGroup = group.name.toLowerCase() === 'color'}

	<div class="options">
		<h6>
			{group.name} <span class="gray">{selectedVariant?.option_name || ''}</span>
		</h6>

		<div class="options__block">
			{#if isColorGroup}
				<RadioGroup bind:value={selectedVariants[group.name.toLowerCase()]} on:select width="auto">
					<div class="options__color-wrap">
						{#each group.options as option}
							{@const hasAssets = option.assets.length > 0}

							<RadioInput
								name="size"
								value={transformSelectedVariants(group, option, productData.assets)}
								selected={option.id === selectedVariant?.option_id}
								borderColor={hasAssets ? 'transparent' : 'black'}
								height="auto"
								selectEffect={hasAssets ? 'border' : 'fill'}
								hoverEffect={hasAssets ? 'border' : 'fill'}
							>
								{#if option.assets.length >= 1}
									<img
										class="options__image"
										src={productData.assets.filter((asset) => option.assets.includes(asset.id))[0]
											?.url}
										alt="Product"
									/>
								{:else}
									<span> {option.name.toUpperCase()}</span>
								{/if}
							</RadioInput>
						{/each}
					</div>
				</RadioGroup>
			{:else}
				<RadioGroup bind:value={selectedVariants[group.name.toLowerCase()]} width="100%">
					{#each group.options as option}
						<div class="options__item">
							<RadioInput
								name="size"
								value={transformSelectedVariants(group, option, productData.assets)}
								width="100%"
								selectEffect="fill"
								border
							>
								<span> {option.name.toUpperCase()}</span>
							</RadioInput>
						</div>
					{/each}
				</RadioGroup>
			{/if}
		</div>
	</div>
{/each}

<style lang="scss">
	.options {
		display: flex;
		gap: 1rem;
		flex-direction: column;

		&__block {
			display: flex;
			width: 100%;
		}

		&__block span {
			display: block;
			padding: 0 8px;
		}

		&__color-wrap {
			display: flex;
			gap: inherit;
			flex-wrap: wrap;
		}

		&__image {
			display: block;
			height: 100%;
			width: 100%;
			max-width: 76px;
			background-color: white;
		}

		h6 {
			text-transform: uppercase;
			font-weight: var(--fw-semibold);
		}
	}

	.gray {
		color: #6e6e6e;
		text-transform: capitalize;
	}

	@media screen and (max-width: 768px) {
		.options {
			&__item {
				width: 100%;
			}

			&__block {
				width: 100%;
			}
		}
	}
</style>
