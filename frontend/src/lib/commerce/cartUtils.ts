import { alerts } from '$lib/stores/alerts';
import { cartCount } from '$lib/stores/cart-store';
import { loadingScreen } from '$lib/stores/interface';
import type { RemoveResponse } from '@chec/commerce.js/features/cart';
import { commerce } from './commerce';

export async function addItemToCart(productId: string, variants?: object, addLoader = false) {
	try {
		/* Add Item To commerceJS cart */
		if (addLoader) loadingScreen.set(true);

		const addedItem = await commerce.cart.add(productId, 1, variants);

		if (addLoader) loadingScreen.set(false);
		cartCount.set(addedItem.cart.total_unique_items);

		alerts.addAlert('Added item to cart', 'success');
	} catch (error) {
		alerts.addAlert('Failed to add product to cart', 'danger');
		return error;
	}
}

export async function removeItemFromCart(lineItemId: string): Promise<RemoveResponse> {
	try {
		/* Add Item To commerceJS cart */
		cartCount.update((count) => (count = count - 1));
		const removedItem = await commerce.cart.remove(lineItemId);

		alerts.addAlert('Removed item from cart', 'success');

		return removedItem;
	} catch (error) {
		alerts.addAlert('Failed to remove product to cart', 'danger');
	}
}

export async function updateQuanitity(lineItemId: string, amount?: number) {
	try {
		const updated = await commerce.cart.update(lineItemId, { quantity: amount });

		console.log('Updated product quanitity');

		return updated;
	} catch (error) {
		alerts.addAlert('Failed to update quanitity', 'danger');
	}
}
