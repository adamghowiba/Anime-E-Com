import type { SelectedOption } from '$lib/types/types';
import type { Asset } from '@chec/commerce.js/types/asset';
import type {
	ProductVariantGroup,
	ProductVariantOption
} from '@chec/commerce.js/types/product-variant-group';

/* Transform the selected option into a single object to be mapped later. */
export function transformSelectedVariants(
	group: ProductVariantGroup,
	option: ProductVariantOption,
	assets: Asset[]
): SelectedOption {
	return {
		group_id: group.id,
		group_name: group.name,
		option_name: option.name,
		option_id: option.id,
		assets: assets.filter((asset) => option.assets.includes(asset.id)),
		price: option.price
	};
}
