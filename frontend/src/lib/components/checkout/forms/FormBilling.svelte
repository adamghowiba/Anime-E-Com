<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
import { STATES } from '$lib/constant/address';
	import { checkoutData } from '$lib/stores/checkout-store';
import { transformStatesToInput } from '$lib/utils/stringUtils';
	import SquareButton from '../../buttons/SquareButton.svelte';

	let billingSameAsShipping: boolean = true;

	$: if (billingSameAsShipping) {
		$checkoutData.billing = {
			...$checkoutData.shipping,
			name: `${$checkoutData.customer.firstname} ${$checkoutData.customer.lastname}`
		};
	}
</script>

<div class="form-group">
	<div class="matches">
		<Checkbox name="billing_match" bind:checked={billingSameAsShipping} />
		<span>Billing matches shipping address </span>
	</div>

	{#if !billingSameAsShipping}
		<div class="form-group__subgroup">
			<h5>Enter your name and address</h5>
			<TextInput
				name="full_name"
				placeholder="Full Name"
				size="large"
				bind:value={$checkoutData.billing.name}
			/>
			<TextInput
				name="street"
				placeholder="Street"
				bind:value={$checkoutData.billing.street}
				size="large"
			/>
			<TextInput
				name="city"
				placeholder="City"
				bind:value={$checkoutData.billing.town_city}
				size="large"
			/>
			<SelectInput
				name="state"
				placeholder="Select State"
				bind:value={$checkoutData.shipping.county_state}
				size="large"
				values={transformStatesToInput(STATES)}
			/>
			<TextInput
				name="zip_code"
				placeholder="Zip Code"
				bind:value={$checkoutData.billing.postal_zip_code}
				size="large"
			/>
		</div>
	{/if}

	<SquareButton width="100%" outlined on:click size="small">Continue</SquareButton>
</div>

<style lang="scss">
	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
	.matches {
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.form-group {
		gap: 2rem;
	}
</style>
