<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import CheckoutFormGroup from '$lib/components/checkout/CheckoutFormGroup.svelte';
	import FormBilling from '$lib/components/checkout/forms/FormBilling.svelte';
	import FormDelivery from '$lib/components/checkout/forms/FormDelivery.svelte';
	import FormShipping from '$lib/components/checkout/forms/FormShipping.svelte';
	import InfoBlock from '$lib/components/checkout/InfoBlock.svelte';
	import { alerts } from '$lib/stores/alerts';
	import type { Address, CheckoutData } from '$lib/types/checkout';
	import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

	let checkoutData: CheckoutToken;
	let checkoutToken: string;
	let billingSameAsShipping: boolean = true;

	let formSteps = ['delivery', 'shipping', 'billing', 'payment'] as const;
	let formStepIndex = 0;
	let currentFormStep: typeof formSteps[number] = formSteps[formStepIndex];

	async function getCartContents() {
		try {
			const cartId = commerce.cart.id();
			const checkout = await commerce.checkout.generateToken(cartId, { type: 'cart' });

			checkoutToken = checkout.id;
			checkoutData = checkout;
		} catch (error) {
			console.log(error);
		}
	}

	getCartContents();

	function setFormStep(step: number) {
		if (step > formSteps.length || step < 0)
			return console.debug('Attempting to go to invalid forms step');

		formStepIndex = step;
		currentFormStep = formSteps[step];
	}

	/* TODO: Clear Billing Address When Editing Again */
	function handleBillingContinue() {
		if (billingSameAsShipping) {
			formData.billing_address = { ...formData.delivery.shipping_address };
		}
		setFormStep(formStepIndex + 1);
	}

	function getAddressFullName(address: Address) {
		return `${address.first_name} ${address.last_name}`;
	}

	function getAddressFormatted(address: Address) {
		return `${address.street} ${address.city} 
				  ${address.state}, 
			      ${address.zip}`;
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
				name: 'Adam Ghowiba'
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

	const formData: CheckoutData = {
		delivery: {
			shipping_address: {
				first_name: 'Adam',
				last_name: 'Ghowiba',
				street: '1020 Waverly Dr.',
				city: 'Longwood',
				state: 'FL',
				zip: ''
			},
			email: 'adamware99@hotmail.com',
			phone: '4079246902'
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

	$: shippingFullName = getAddressFullName(formData.delivery.shipping_address);
	$: shippingAddress = getAddressFormatted(formData.delivery.shipping_address);
	$: billingFullName = getAddressFullName(formData.billing_address);
	$: billingAddress = getAddressFormatted(formData.billing_address);

	// getCartContents();

	// $: console.log(currentFormStep, formStepIndex);
</script>

<section class="checkout container container--lg">
	<div class="checkout__summary">
		<!-- Contact Information / Shipping Address -->
		<CheckoutFormGroup
			title="Delivery"
			isCompleted={formStepIndex > 0}
			isActive={currentFormStep == 'delivery'}
		>
			<InfoBlock
				slot="completed"
				title={shippingFullName}
				desc={shippingAddress}
				on:click={() => setFormStep(0)}
				actionable
			>
				Edit
			</InfoBlock>
			<FormDelivery
				bind:deliveryData={formData.delivery}
				on:click={() => setFormStep(formStepIndex + 1)}
			/>
		</CheckoutFormGroup>

		<!-- Shipping Carrier / Info -->
		<CheckoutFormGroup
			title="Shipping"
			isCompleted={formStepIndex > 1}
			isActive={currentFormStep == 'shipping'}
		>
			<InfoBlock
				slot="completed"
				title={formData.shipping_details.description}
				desc={'Arrival Apr 14 - Apr 20'}
				actionable
				on:click={() => setFormStep(1)}
			>
				Edit
			</InfoBlock>
			<FormShipping
				shippingMethod={checkoutData?.shipping_methods}
				bind:checkoutData={formData.shipping_details}
				on:click={() => setFormStep(formStepIndex + 1)}
			/>
		</CheckoutFormGroup>

		<!-- Billing Information -->
		<CheckoutFormGroup
			title="Billing"
			isCompleted={formStepIndex > 2}
			isActive={currentFormStep == 'billing'}
		>
			<InfoBlock
				slot="completed"
				title={billingFullName}
				desc={billingAddress}
				actionable
				on:click={() => setFormStep(2)}>Edit</InfoBlock
			>

			<FormBilling
				bind:billingSameAsShipping
				bind:billingData={formData.billing_address}
				on:click={handleBillingContinue}
			/>
		</CheckoutFormGroup>

		<CheckoutFormGroup title="Payment" />
	</div>

	<div class="contents" />
</section>

<style lang="scss">
	.checkout {
		display: grid;
		grid-template-columns: 1fr 1fr;

		/* TODO: Match Design System */
		h5 {
			font-size: 18px;
		}
	}
</style>
