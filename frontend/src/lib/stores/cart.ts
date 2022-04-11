import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Product, CartProduct } from '$lib/types/interface';
import { commerce } from '$lib/commerce/commerce';

const localSavedItems = browser ? JSON.parse(localStorage?.getItem('cart-items'))?.items : [];

const createCartStore = () => {
	const { subscribe, update, set }: Writable<CartProduct[]> = writable(localSavedItems || []);

	subscribe((item) => {
		if (!browser) return;
		localStorage.setItem('cart-items', JSON.stringify({ items: item }));
	});

	const addItem = async (product: Omit<CartProduct, 'id'>, lineItemId?: string) => {
		// /* Add product to cart with variants */
		// const { line_item_id } = await addProductToCart(product);
		// const itemExsists = get(cartItems).find((item) => item.id === line_item_id);
		// const sameVariants =
		// 	JSON.stringify(itemExsists?.variants) === JSON.stringify(product?.variants);
		// if (itemExsists && sameVariants) {
		// 	updateItem(itemExsists.id, { quanity: itemExsists.quanity + 1 });
		// 	return;
		// }
		// update((data) => {
		// 	return [...data, { id: line_item_id, ...product }];
		// });
	};

	const removeItem = async (id: string) => {
		const itemRemoved = await commerce.cart.remove(id);
		console.log(itemRemoved);

		update((data) => {
			return data.filter((items) => items.id !== id);
		});
	};

	const updateQuantity = async (id: string, quantity) => {
		const updatedItem = await commerce.cart.update(id, { quantity });
		console.log(updatedItem);

		update((items) => {
			const itemIndex = items.findIndex((item) => item.id === id);
			if (itemIndex >= 0) items[itemIndex].quanity = quantity;
			return items;
		});
	};

	const updateItem = async (id: string, data: Partial<CartProduct>) => {
		update((items) => {
			const itemIndex = items.findIndex((item) => item.id === id);
			if (itemIndex >= 0) items[itemIndex] = { ...items[itemIndex], ...data };
			return items;
		});
	};

	return {
		addItem,
		removeItem,
		subscribe,
		updateItem,
		updateQuantity,
		set,
		update
	};
};

export const cartItems = createCartStore();
