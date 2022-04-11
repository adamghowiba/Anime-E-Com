<script lang="ts">
	import type { Product } from '@chec/commerce.js/types/product';
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import type { SelectedVariant } from '@chec/commerce.js/types/selected-variant';
	import type { Asset } from '@chec/commerce.js/types/asset';
	import type {
		ProductVariantGroup,
		ProductVariantOption
	} from '@chec/commerce.js/types/product-variant-group';

	type SelectedOption = Omit<SelectedVariant, 'price'> & { assets: Asset[] };

	export let productData: Product;
	export let selectedVariants: { [group: string]: SelectedOption } = {};

	/* Transform the selected option into a single object to be mapped later. */
	function parseSelectedVariant(
		group: ProductVariantGroup,
		option: ProductVariantOption
	): SelectedOption {
		return {
			group_id: group.id,
			group_name: group.name,
			option_name: option.name,
			option_id: option.id,
			assets: productData.assets.filter((asset) => option.assets.includes(asset.id))
		};
	}
</script>

{#each productData.variant_groups as group}
	{@const selectedVariant = selectedVariants[group.name]}
	{@const isColorGroup = group.name.toLowerCase() === 'color'}

	<div class="options">
		<h6>
			{group.name} <span class="gray">{selectedVariant?.option_name || ''}</span>
		</h6>

		<div class="options__block">
			<RadioGroup bind:value={selectedVariants[group.name]}>
				{#each group.options as option}
					<RadioInput name="size" value={parseSelectedVariant(group, option)} border={true}>
						{#if option.assets.length >= 1}
							<img
								class="options__image"
								src={productData.assets.filter((asset) => option.assets.includes(asset.id))[0]?.url}
								alt=""
							/>
						{:else}
							{option.name.toUpperCase()}
						{/if}
					</RadioInput>
				{/each}
			</RadioGroup>
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
			gap: 7px;
		}

        &__image {
            height: auto;
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
</style>
