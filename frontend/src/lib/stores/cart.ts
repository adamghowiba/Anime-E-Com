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

	const addItem = (product: CartProduct) => {
		const itemExsists = get(cartItems).find((item) => item.id === product.id);
		const sameVariants =
			JSON.stringify(itemExsists?.variants) === JSON.stringify(product?.variants);

		if (itemExsists && sameVariants) {
			updateItem(itemExsists.id, { quanity: itemExsists.quanity + 1 });
			return;
		}

		/* Add product to cart with variants */
		// commerce.cart.add(
		// 	product.productId,
		// 	1,
		// 	product.selectedVariant.reduce((acc, curr) => {
		// 		acc[curr.groupId] = curr.optionId;
		// 		return acc;
		// 	}, {} as { [key: string]: string })
		// );
		update((data) => {
			return [...data, { id: Math.floor(Math.random() * 1000), ...product }];
		});
	};

	const removeItem = (id: string) => {
		update((data) => {
			return data.filter((items) => items.id !== id);
		});
	};

	const updateItem = (id: string, data: Partial<CartProduct>) => {
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
		set,
		update
	};
};

export const cartItems = createCartStore();
