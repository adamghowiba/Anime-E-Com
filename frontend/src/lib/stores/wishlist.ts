import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Product } from '$lib/types/interface';

const localSavedItems = browser ? JSON.parse(localStorage?.getItem('saved-items'))?.items : [];

type WishlistProduct = Omit<Product, 'id'>;

const crateWishlistStore = () => {
	const { subscribe, update, set }: Writable<WishlistProduct[]> = writable(localSavedItems || []);

	subscribe((item) => {
		if (!browser) return;
		localStorage.setItem('saved-items', JSON.stringify({ items: item }));
	});

	const addItem = (product: WishlistProduct) => {
		update((data) => {
			/* TODO: Fix whats going on here with id */
			return [...data, product];
		});
	};

	const removeItem = (productId: string) => {
		update((data) => {
			return data.filter((items) => items.productId !== productId);
		});
	};

	return {
		addItem,
		removeItem,
		subscribe,
		update
	};
};

export const savedItems = crateWishlistStore();
