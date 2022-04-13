import type { Address } from '$lib/types/checkout';

export function slugify(text: string): string {
	text = text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-');
	return text;
}

export function unslugify(slug: string): string {
	slug = slug.replace(/-/g, ' ');
	return slug;
}

export function getAddressFullName(address: Address) {
	return `${address.first_name} ${address.last_name}`;
}

export function getAddressFormatted(address: Address) {
	return `${address.street} ${address.city} 
			  ${address.state}, 
			  ${address.zip}`;
}
