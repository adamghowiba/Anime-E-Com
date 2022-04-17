// Import the Commerce module
import Commerce from '@chec/commerce.js';
import type { Product } from '@chec/commerce.js/types/product';

// Create a Commerce instance
export const commerce = new Commerce('pk_40534abcf8b5ba6025211e4d430bda4cf6e552ca56256');


export const isValidProduct = (product: Product): boolean => {
	if (!product.variant_groups.find((variant) => variant.name.toLowerCase() === 'size'))
		return false;
	if (product.assets.length == 0) return false;

	return true;
}