import type { LineItem } from '@chec/commerce.js/types/line-item';
import { commerce } from './commerce';

/**
 * Checks if any cart items are invalid. IE removed from store.
 *
 * @param items Cart items to sanitize
 * @returns {string[]} Number of Line Items removed.
 */
export async function sanitizeLineItems(items: LineItem[], remove = true): Promise<number> {
	const cartId = commerce.cart.id();
	if (!cartId) return;

	const invalidItems = items.filter((items) => !items.permalink);

	if (remove && invalidItems) {
		invalidItems.forEach(async (item) => await commerce.cart.remove(item.id));
	}

	return invalidItems.length;
}

