import type { Product } from '@chec/commerce.js/types/product';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

type CollectionStore = {[type: string]: Product[]}

const createCollectionStore = () => {
	const store: Writable<CollectionStore> = writable({});

	const setProductsForType = (type: string, products: Product[]) => {
        store.update((state) => {
            state[type] = products;
            return state;
        })
    };

	return {
		subscribe: store.subscribe,
        setProductsForType
	};
};

export const collectionStore = createCollectionStore();
