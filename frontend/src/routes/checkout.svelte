<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import CheckoutFormGroup from '$lib/components/checkout/CheckoutFormGroup.svelte';
	import FormBilling from '$lib/components/checkout/forms/FormBilling.svelte';
	import FormDelivery from '$lib/components/checkout/forms/FormDelivery.svelte';
	import FormPayment from '$lib/components/checkout/forms/FormPayment.svelte';
	import FormShipping from '$lib/components/checkout/forms/FormShipping.svelte';
	import OrderSummary from '$lib/components/order/OrderSummary.svelte';
	import CartItem from '$lib/components/product/CartItem.svelte';
	import CartItemSkeleton from '$lib/components/skeleton/CartItemSkeleton.svelte';
	import { alerts } from '$lib/stores/alerts';
	import { cartCount } from '$lib/stores/cart-store';
	import { loadingScreen } from '$lib/stores/interface';
	import { getAddressFormatted, getAddressFullName } from '$lib/utils/stringUtils';
	import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
	import type { Live } from '@chec/commerce.js/types/live';
	import { checkoutData as checkoutStore } from '$lib/stores/checkout-store';
	import InfoBlock from '$lib/components/checkout/InfoBlock.svelte';

	interface FormStep {
		name: typeof formSteps[number];
		component: ConstructorOfATypedSvelteComponent;
		completed: { title: string; desc: string };
	}

	let checkoutData: CheckoutToken;
	let checkoutToken: string;
	let liveCheckoutData: Live;

	let isPaymentProcessing: boolean = false;

	let formSteps = ['delivery', 'shipping', 'billing', 'payment'] as const;
	let formStepIndex = 0;

	$: shippingName = $checkoutStore.shipping.name;
	$: shippingStreet = $checkoutStore.shipping.street;
	$: fulfillmentMethod = $checkoutStore.fulfillment.description;

	$: formStepObject = [
		{
			name: 'delivery',
			component: FormDelivery,
			completed: { title: shippingName, desc: shippingStreet }
		},
		{
			name: 'billing',
			component: FormBilling,
			completed: { title: shippingName, desc: shippingStreet }
		},
		{
			name: 'shipping',
			component: FormShipping,
			completed: { title: fulfillmentMethod, desc: 'Arrival Apr 14 - Apr 20' }
		},
		{
			name: 'payment',
			component: FormPayment,
			completed: null
		}
	] as FormStep[];

	(async function getCartContents() {
		try {
			const cartId = commerce.cart.id();
			const checkout = await commerce.checkout.generateToken(cartId, { type: 'cart' });

			liveCheckoutData = checkout.live;
			checkoutToken = checkout.id;
			checkoutData = checkout;
		} catch (error) {
			console.log(error);
		}
	})();

	function setFormStep(step: number) {
		if (step > formSteps.length || step < 0)
			return console.debug('Attempting to go to invalid forms step');

		formStepIndex = step;
	}

	async function handleCheckout() {
		if (!checkoutToken) return alerts.addAlert('No checkout token present', 'danger');
		try {
			$loadingScreen = true;
			console.debug('Checking out with', checkoutToken);
			/* 			const capture = await commerce.checkout.capture(finalCheckoutToken.id, {
				customer: {
					email: $checkoutStore.delivery.email,
					firstname: $checkoutStore.delivery.shipping_address.first_name,
					lastname: $checkoutStore.delivery.shipping_address.last_name,
					phone: $checkoutStore.delivery.phone
				},
				shipping: {
					country: 'US',
					county_state: $checkoutStore.delivery.shipping_address.state,
					postal_zip_code: '32714',
					street: $checkoutStore.delivery.shipping_address.street,
					town_city: $checkoutStore.delivery.shipping_address.city,
					name: getAddressFullName($checkoutStore.delivery.shipping_address)
				},
				billing: {
					country: 'US',
					county_state: $checkoutStore.billing_address.state,
					postal_zip_code: '32714',
					street: $checkoutStore.billing_address.street,
					town_city: $checkoutStore.billing_address.city,
					name: getAddressFullName($checkoutStore.billing_address)
				},
				fulfillment: {
					shipping_method: $checkoutStore.shipping_details.id
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
			}); */

			const capture = await commerce.checkout.capture(checkoutToken, {
				...$checkoutStore,
				fulfillment: { shipping_method: $checkoutStore.fulfillment.id }
			});

			console.debug('Order successful', capture);
			$cartCount = 0;
		} catch (error) {
			alerts.addAlert('Something went wrong. Please try again', 'danger');
			console.error('Error occured while processing order', error);
		} finally {
			$loadingScreen = false;
		}
	}
</script>

<section class="checkout container container--sm">
	<div class="capture">
		{#each formStepObject as step, i}
			<CheckoutFormGroup
				title={step.name}
				isActive={formStepIndex == i}
				isCompleted={formStepIndex > i}
			>
				<svelte:component
					this={step.component}
					shippingMethod={checkoutData?.shipping_methods}
					onCheckout={handleCheckout}
					on:click={() => setFormStep(i + 1)}
				/>

				<InfoBlock slot="completed" {...step.completed} actionable on:click={() => setFormStep(i)}>
					Edit
				</InfoBlock>
			</CheckoutFormGroup>
		{/each}
	</div>

	<div class="summary">
		<OrderSummary
			subtotal={liveCheckoutData?.subtotal?.formatted_with_code}
			total={liveCheckoutData?.total_with_tax?.formatted_with_code}
		/>

		<div class="summary__items">
			{#if checkoutData}
				{#each liveCheckoutData.line_items as data}
					<CartItem product={data} quantityTicker={false} removeAction={false} divider={false} />
				{/each}
			{:else}
				{#each Array($cartCount) as _}
					<CartItemSkeleton />
				{/each}
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
			gap: 1.2rem;
		}
	}
</style>
