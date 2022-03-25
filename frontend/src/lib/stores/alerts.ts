import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { AlertType } from '$lib/types/types';
import type { AlignLocation } from '$lib/types/interface';

interface Alert {
	message: string;
	type: AlertType;
	location: AlignLocation;
	id: number;
}

const defaultAlign: AlignLocation = { horizontal: 'right', vertical: 'bottom' };

const createAlerts = () => {
	const store: Writable<Alert[]> = writable([]);

	const addAlert = (message: string, type: AlertType, location?: AlignLocation) => {
		store.update((data) => {
			data.push({
				message,
				type,
				id: Math.floor(Math.random() * 1000),
				location: location || defaultAlign
			});
			return data;
		});

		setTimeout(() => {
			store.update((data) => {
				data.shift();
				return data;
			});
		}, 7000);
	};

	return {
		subscribe: store.subscribe,
		addAlert
	};
};

/* TODO: Dynamic Alert Locations */
export const alertLocation: Writable<AlignLocation> = writable(defaultAlign);
export const alerts = createAlerts();
