import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';

interface Product {
	thumbnail: string;
	title: string;
	price: number;
	id: string;
}

const localSavedItems = browser ? JSON.parse(localStorage?.getItem('saved-items'))?.items : [];

const createSavedItemStore = () => {
	const { subscribe, update, set }: Writable<Product[]> = writable(localSavedItems || []);

	subscribe((item) => {
		if (!browser) return;
		localStorage.setItem('saved-items', JSON.stringify({ items: item }));
	});

	const addItem = (product: Product) => {
		update((data) => {
			return [...data, product];
		});
	};

	const removeItem = (id: string) => {
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

export const savedItems = createSavedItemStore();
