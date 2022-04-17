/* 
Logical Collection Type are types that contain a list of product but aren't directly a catagory

Logical Collection Types:
- New Releases
- All Products
*/

import type { Product } from '@chec/commerce.js/types/product';
import { commerce } from './commerce';

export async function getNewReleasedProducts(): Promise<Product[]> {
	console.log('Getting new released products');
	const { data } = await commerce.products.list({ sortBy: 'created', sortDirection: 'desc' });
	return data;
}

export async function getAllProducts(): Promise<Product[]> {
	const { data } = await commerce.products.list();
	return data;
}

export async function getProductsByType(type: string): Promise<Product[]> {
	if (type === 'all-products') {
		return await getAllProducts();
	}

	if (type === 'new-releases') {
		return await getNewReleasedProducts();
	}

	const { data } = await commerce.products.list({ category_slug: type });
	return data;
}

export function sortBy(
	products: Product[],
	options: { type: 'price' | 'date'; order: 'asc' | 'desc' }
): Product[] {
	if (!products) return;

	if (options.type === 'date') {
		return products.sort((a, b) =>
			options.order == 'desc' ? a.created - b.created : b.created - a.created
		);
	}

	if (options.type === 'price') {
		return products.sort((a, b) =>
			options.order == 'desc' ? a.price.raw - b.price.raw : b.price.raw - a.price.raw
		);
	}
}

/* Return a set of the categories that are in the collection. */
export function getCategoriesPresent(products: Product[]) {
	const presentCatOptions = new Set<string>();

	products.forEach((product) => {
		product.categories.forEach((cat) => presentCatOptions.add(cat.slug));
	});

	return presentCatOptions;
}
