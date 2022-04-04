import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const overlay: Writable<boolean> = writable(false);
export const navOverlay: Writable<boolean> = writable(false);
export const navbarMinimzed: Writable<boolean> = writable(false);
