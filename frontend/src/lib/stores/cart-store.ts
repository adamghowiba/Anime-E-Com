import { commerce } from '$lib/commerce/commerce';
import { writable, type Writable } from 'svelte/store';

export const cartCount: Writable<number> = writable(0, (set) => {
	commerce.cart.contents().then((cart) => set(cart.length));
});
