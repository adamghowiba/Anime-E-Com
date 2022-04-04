<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import SquareButton from '$lib/components/global/SquareButton.svelte';
	import { alerts } from '$lib/stores/alerts';
	import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
	import type { LineItem } from '@chec/commerce.js/types/line-item';

	let checkoutData: CheckoutToken;
	let checkoutToken: string;

	async function getCartContents() {
		try {
			const cartId = await commerce.cart.id();
			const cart = await commerce.checkout.generateToken(cartId, { type: 'cart' });
			checkoutToken = cart.id;

			checkoutData = cart;
		} catch (error) {
			console.log(error);
		}
	}

	async function testCheckout() {
		if (!checkoutToken) return alerts.addAlert('No checkout token present', 'danger');
        const newCheckoutToken = await commerce.checkout.getToken(checkoutToken);

        console.log('Checking out with', newCheckoutToken.id);
		const capture = await commerce.checkout.capture(newCheckoutToken.id, {
			customer: {
				email: 'adamware99@hotmail.com',
				firstname: 'Adam',
				lastname: 'Ghowiba',
				phone: '4079246902'
			},
			shipping: {
				country: 'US',
				county_state: 'FL',
				postal_zip_code: '32714',
				street: '1020 Waverly Dr',
				town_city: 'Longwood',
                name: "Adam Ghowiba"
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
			}
		});

		console.log(capture);
	}

	getCartContents();
</script>

<section class="container container--lg">
	<h3>Cart Items</h3>

	<div class="contents">
		{#if checkoutData}
			{#each checkoutData.line_items as items}
				<div class="line-item">
					<span>{items.name}</span>
					<span>{items.description}</span>
					<span>{items.quantity}</span>
				</div>
			{/each}
		{:else}
			<h5>Loading....</h5>
		{/if}
	</div>

	<SquareButton buttonColor="black" on:click={testCheckout}>Checkout</SquareButton>
</section>

<style lang="scss">
	.contents {
		display: flex;
		flex-direction: column;

		&__line-item {
		}
	}
</style>
