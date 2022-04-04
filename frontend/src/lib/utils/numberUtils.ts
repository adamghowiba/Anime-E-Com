import type { Product, SelectedVariant } from '$lib/types/interface';

export const generateProductId = (productId: string, variants: SelectedVariant[]) => {
	return `${productId}--${variants.reduce((acc, curr) => (acc = [...acc, curr.optionName]), [])}`;
};
