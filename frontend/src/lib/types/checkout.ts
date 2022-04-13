import type { ShippingMethod } from "@chec/commerce.js/types/shipping-method";

export interface Address {
    first_name: string;
    last_name: string;
    street: string;
    city: string;
    state: string;
    zip?: string;
}

export interface Delivery {
    email: string;
    phone: string;
    shipping_address: Address;
}

export interface CheckoutData {
    delivery: Delivery;
    shipping_details: ShippingMethod;
    billing_address: Address;
}