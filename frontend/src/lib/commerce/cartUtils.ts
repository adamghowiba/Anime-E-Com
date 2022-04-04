import { alerts } from '$lib/stores/alerts';
import { cartItems } from '$lib/stores/cart';
import type { CartProduct } from '$lib/types/interface';
import { commerce } from './commerce';

export const parseSelectedProducts = async (product: Omit<CartProduct, 'id'>) => {
	const parsedVariants = product.selectedVariant.reduce((acc, curr) => {
		acc[curr.groupId] = curr.optionId;
		return acc;
	}, {} as { [key: string]: string });

	return parsedVariants;
};

export async function addItemToCart(product: Omit<CartProduct, 'id'>) {
    try {
        /* Add Item To commerceJS cart */
        await commerce.cart.add(product.productId, 1, parseSelectedProducts(product));
    
        /* Add Item To Store */
        cartItems.addItem(product);
    
        alerts.addAlert('Added item to cart', 'success');
    } catch (error) {
        alerts.addAlert('Failed to add product to cart', 'danger');
    }
}

export async function removeItemFromCart(product: Omit<CartProduct, 'id'>) {
    try {
        /* Add Item To commerceJS cart */
        await commerce.cart.remove(product.productId);
    
        /* Add Item To Store */
        cartItems.removeItem(product.productId);
    
        alerts.addAlert('Removed item to cart', 'success');
    } catch (error) {
        alerts.addAlert('Failed to remove product to cart', 'danger');
    }
}
