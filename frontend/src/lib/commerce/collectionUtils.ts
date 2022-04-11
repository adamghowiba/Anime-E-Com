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
