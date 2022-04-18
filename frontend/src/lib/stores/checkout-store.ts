import type { CheckoutData } from '$lib/types/checkout';
import type { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import type { ShippingMethod } from '@chec/commerce.js/types/shipping-method';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

type CustomCheckoutCapture = CheckoutCapture & { fulfillment: ShippingMethod };

const formData: CheckoutData = {
	delivery: {
		shipping_address: {
			first_name: '',
			last_name: '',
			street: '',
			city: '',
			state: '',
			zip: ''
		},
		email: '',
		phone: ''
	},
	billing_address: {
		first_name: '',
		last_name: '',
		city: '',
		state: '',
		street: '',
		zip: ''
	},
	shipping_details: {
		countries: [],
		description: '',
		id: '',
		price: null
	}
};

const captureData: CustomCheckoutCapture = {
	customer: {
		email: '',
		firstname: '',
		lastname: '',
		phone: ''
	},
	shipping: {
		name: '',
		street: '',
		town_city: '',
		county_state: '',
		postal_zip_code: '',
		country: 'US'
	},
	billing: {
		name: '',
		street: '',
		town_city: '',
		county_state: '',
		postal_zip_code: '',
		country: 'US'
	},
	fulfillment: {
		description: '',
		price: null,
		shipping_method: '',
		countries: [],
		id: ''
	},
	payment: {
		gateway: 'test_gateway',
		card: {
			number: '4242 4242 4242 4242',
			expiry_month: '01',
			expiry_year: '2023',
			cvc: '123',
			postal_zip_code: '94103'
		}
	},
	discount_code: null
};

export const checkoutData: Writable<CustomCheckoutCapture> = writable(captureData);
