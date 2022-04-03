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
