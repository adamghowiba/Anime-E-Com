import type { Category } from '@chec/commerce.js/types/category';
import type { Product } from '@chec/commerce.js/types/product';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const categoriesStore: Writable<Category[]> = writable();
