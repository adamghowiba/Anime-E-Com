import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Product, CartProduct } from '$lib/types/interface';

const localSavedItems = browser ? JSON.parse(localStorage?.getItem('cart-items'))?.items : [];

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const createCartStore = () => {
	const { subscribe, update, set }: Writable<CartProduct[]> = writable(localSavedItems || []);

	subscribe((item) => {
		if (!browser) return;
		localStorage.setItem('cart-items', JSON.stringify({ items: item }));
	});

	const addItem = (product: CartProduct) => {
		const itemExsists = get(cartItems).find((item) => item.id === product.id);
		console.log(itemExsists?.variants, product?.variants);

		if (
			itemExsists &&
			JSON.stringify(itemExsists?.variants) === JSON.stringify(product?.variants)
		) {
			updateItem(itemExsists.id, { quanity: itemExsists.quanity + 1 });
			return;
		}

		update((data) => {
			return [...data, { id: Math.floor(Math.random() * 1000), ...product }];
		});
	};

	const removeItem = (id: number) => {
		update((data) => {
			return data.filter((items) => items.id !== id);
		});
	};

	const updateItem = (id: number, data: Partial<CartProduct>) => {
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
