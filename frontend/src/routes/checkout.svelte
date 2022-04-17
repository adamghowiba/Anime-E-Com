<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import CheckoutFormGroup from '$lib/components/checkout/CheckoutFormGroup.svelte';
	import FormBilling from '$lib/components/checkout/forms/FormBilling.svelte';
	import FormDelivery from '$lib/components/checkout/forms/FormDelivery.svelte';
	import FormPayment from '$lib/components/checkout/forms/FormPayment.svelte';
	import FormShipping from '$lib/components/checkout/forms/FormShipping.svelte';
	import InfoBlock from '$lib/components/checkout/InfoBlock.svelte';
	import OrderSummary from '$lib/components/order/OrderSummary.svelte';
	import CartItem from '$lib/components/product/CartItem.svelte';
	import CartItemSkeleton from '$lib/components/skeleton/CartItemSkeleton.svelte';
	import { alerts } from '$lib/stores/alerts';
	import { cartCount } from '$lib/stores/cart-store';
	import { loadingScreen } from '$lib/stores/interface';
	import type { Address, CheckoutData } from '$lib/types/checkout';
	import { getAddressFormatted, getAddressFullName } from '$lib/utils/stringUtils';
	import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
	import type { Live } from '@chec/commerce.js/types/live';

	let checkoutData: CheckoutToken;
	let checkoutToken: string;
	let liveCheckoutData: Live;

	let billingSameAsShipping: boolean = true;
	let isPaymentProcessing: boolean = false;

	let formSteps = ['delivery', 'shipping', 'billing', 'payment'] as const;
	let formStepIndex = 0;
	let currentFormStep: typeof formSteps[number] = formSteps[formStepIndex];

	async function getCartContents() {
		try {
			const cartId = commerce.cart.id();
			const checkout = await commerce.checkout.generateToken(cartId, { type: 'cart' });

			liveCheckoutData = checkout.live;
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

	async function handleCheckout() {
		if (!checkoutToken) return alerts.addAlert('No checkout token present', 'danger');
		$loadingScreen = true;
		console.debug('Checking out with', checkoutToken);

		const finalCheckoutToken = await commerce.checkout.getToken(checkoutToken);
		console.debug('Comparing', checkoutToken, finalCheckoutToken.id);
		try {
			const capture = await commerce.checkout.capture(finalCheckoutToken.id, {
				customer: {
					email: formData.delivery.email,
					firstname: formData.delivery.shipping_address.first_name,
					lastname: formData.delivery.shipping_address.last_name,
					phone: formData.delivery.phone
				},
				shipping: {
					country: 'US',
					county_state: formData.delivery.shipping_address.state,
					postal_zip_code: '32714',
					street: formData.delivery.shipping_address.street,
					town_city: formData.delivery.shipping_address.city,
					name: getAddressFullName(formData.delivery.shipping_address)
				},
				billing: {
					country: 'US',
					county_state: formData.billing_address.state,
					postal_zip_code: '32714',
					street: formData.billing_address.street,
					town_city: formData.billing_address.city,
					name: getAddressFullName(formData.billing_address)
				},
				fulfillment: {
					shipping_method: formData.shipping_details.id
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

			console.debug('Order successful', capture);
			$cartCount = 0;
		} catch (error) {
			console.error('Error occured while processing order', error);
		} finally {
			$loadingScreen = false;
		}
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
</script>

<section class="checkout container container--sm">
	<div class="capture">
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

		<CheckoutFormGroup title="Payment" isActive={currentFormStep == 'payment'}>
			<FormPayment on:click={handleCheckout} />
		</CheckoutFormGroup>
	</div>

	<div class="summary">
		<OrderSummary
			subtotal={liveCheckoutData?.subtotal?.formatted_with_code}
			total={liveCheckoutData?.total_with_tax?.formatted_with_code}
		/>

		<div class="summary__items">
			{#if checkoutData}
				{#each liveCheckoutData.line_items as data}
					<CartItem
						title={data.name}
						price={data.price.raw}
						productId={data.product_id}
						quantity={data.quantity}
						permalink={data.permalink}
						id={data.id}
						variants={data.selected_options}
						thumbnail={data.image.url}
						quantityTicker={false}
						removeAction={false}
					/>
				{/each}
			{:else}
				<CartItemSkeleton />
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.checkout {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 4rem;

		.capture {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}

	.summary {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: sticky;
		height: max-content;
		top: 4.5rem;

		&__items {
			display: flex;
			flex-direction: column;
		}
	}
</style>
