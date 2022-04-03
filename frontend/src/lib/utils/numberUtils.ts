import type { Product } from "$lib/types/interface";

export const generateProductId = (productId: string, variants: {[key: string]: unknown}) => {
	return `${productId}--${Object.values(variants).join('_')}`
};
