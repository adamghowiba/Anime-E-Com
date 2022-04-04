// Import the Commerce module
import type { VariantGroup } from '$lib/types/interface';
import Commerce from '@chec/commerce.js';
import type { Asset } from '@chec/commerce.js/types/asset';
import type { Product } from '@chec/commerce.js/types/product';

// Create a Commerce instance
export const commerce = new Commerce('pk_40534abcf8b5ba6025211e4d430bda4cf6e552ca56256');

/**
 * @param {Product} product Product data that will be parsed
 * @returns Products formatted by {name, assets}
 *
 * Parses product colors into an easier format for the frontend to consume
 */
export const parseProductColors = (product: Product): VariantGroup => {
	const colorVariant = product.variant_groups.find(
		(variant) => variant.name.toLowerCase() === 'color'
	);
	if (!colorVariant) return;

	const options = colorVariant?.options.map(({ name, assets, id }) => {
		return { name, assets: product.assets.filter((asset) => assets.includes(asset.id)), id };
	});
	const variantData: VariantGroup = { id: colorVariant.id, name: colorVariant.name, options };

	return variantData;
};

/**
 * @param {Product} product Product data that will be parsed
 * @returns Products formatted by size[]
 *
 * Parses product sizes into a flat array
 */
export const parseProductSizes = (product: Product): VariantGroup => {
	const sizeVariant = product.variant_groups.find(
		(variant) => variant.name.toLowerCase() === 'size'
	);
	if (!sizeVariant) return;

	const options = sizeVariant?.options.map(({ name, assets, id }) => {
		return { name, assets: product.assets.filter((asset) => assets.includes(asset.id)), id };
	});
	const variantData: VariantGroup = { id: sizeVariant.id, name: sizeVariant.name, options };

	return variantData;
};

export const isValidProduct = (product: Product): boolean => {
	if (!product.variant_groups.find((variant) => variant.name.toLowerCase() === 'size'))
		return false;
	if (product.assets.length == 0) return false;

	return true;
};
