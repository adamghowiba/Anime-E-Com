import type { HorizontalLocation, VerticalLocation } from './types';

export interface AlignLocation {
	horizontal: HorizontalLocation;
	vertical: VerticalLocation;
}

export interface Product {
	thumbnail: string;
	title: string;
	price: number;
	productId: string;
	id: number;
	variants?: { [key: string]: unknown };
}

export interface CartProduct extends Product {
	quanity: number;
}
