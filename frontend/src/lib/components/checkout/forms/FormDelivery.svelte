<script lang="ts">
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import { STATES } from '$lib/constant/address';
	import { checkoutData } from '$lib/stores/checkout-store';
	import { transformStatesToInput } from '$lib/utils/stringUtils';
	import { onMount } from 'svelte';
	import SquareButton from '../../buttons/SquareButton.svelte';
	import TextInput from '../../inputs/TextInput.svelte';

	let formComplete: boolean = false;
	let formElement: HTMLFormElement;

	/* TODO Escaping text after disabled button and typing doesn't fix it. */
	function verifyFormCompleted() {
		if (!formElement.checkValidity()) {
			return (formComplete = false);
		}
		return (formComplete = true);
	}

	onMount(() => {
		verifyFormCompleted();
	});

	$: $checkoutData.shipping.name = `${$checkoutData.customer.firstname} ${$checkoutData.customer.lastname}`;
</script>

<form
	bind:this={formElement}
	class="form-group"
	on:input={verifyFormCompleted}
	on:submit|preventDefault
>
	<div class="form-group__subgroup">
		<h5>Enter your name and address</h5>
		<TextInput
			name="first_name"
			placeholder="First Name"
			required
			size="large"
			bind:value={$checkoutData.customer.firstname}
		/>
		<TextInput
			name="last_name"
			placeholder="Last Name"
			size="large"
			required
			bind:value={$checkoutData.customer.lastname}
		/>
		<TextInput
			name="street"
			placeholder="Street"
			size="large"
			required
			bind:value={$checkoutData.shipping.street}
		/>
		<TextInput
			name="city"
			placeholder="City"
			size="large"
			required
			bind:value={$checkoutData.shipping.town_city}
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
			size="large"
			required
			bind:value={$checkoutData.shipping.postal_zip_code}
		/>
	</div>

	<div class="form-group__subgroup">
		<h5>What's your contact infomration?</h5>
		<TextInput
			name="email"
			placeholder="Email"
			type="email"
			size="large"
			required
			bind:value={$checkoutData.customer.email}
		/>
		<TextInput
			name="number"
			placeholder="Phone Number"
			size="large"
			type="phone"
			required
			bind:value={$checkoutData.customer.phone}
		/>
		<span class="text-terms"
			>I have read and consent to eShopWorld processing my information in accordance with the
			Privacy Statement and Cookie Policy.
		</span>
	</div>

	<SquareButton width="100%" outlined disabled={!formComplete} size="small" on:click
		>Continue</SquareButton
	>
</form>

<style lang="scss">
	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
</style>
