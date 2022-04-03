import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Product } from '$lib/types/interface';

const localSavedItems = browser ? JSON.parse(localStorage?.getItem('saved-items'))?.items : [];
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const crateWishlistStore = () => {
	const { subscribe, update, set }: Writable<Product[]> = writable(localSavedItems || []);

	subscribe((item) => {
		if (!browser) return;
		localStorage.setItem('saved-items', JSON.stringify({ items: item }));
	});

	const addItem = (product: Optional<Product, 'id'>) => {
		update((data) => {
			return [...data, {id: Math.floor(Math.random() * 1000), ...product}];
		});
	};

	const removeItem = (id: number) => {
		update((data) => {
			return data.filter((items) => items.id !== id);
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
