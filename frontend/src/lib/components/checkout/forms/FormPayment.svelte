<script lang="ts">
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import type { Delivery } from '$lib/types/checkout';
	import { onMount } from 'svelte';
	import SquareButton from '../../buttons/SquareButton.svelte';
	import TextInput from '../../inputs/TextInput.svelte';
	import InfoBlock from '../InfoBlock.svelte';

	// export let deliveryData: Delivery;
	let formComplete: boolean = false;
	let formElement: HTMLFormElement;

	let paymentMethod;

	function verifyFormCompleted() {
		if (!formElement.checkValidity()) {
			return (formComplete = false);
		}
		return (formComplete = true);
	}

	onMount(() => {
		verifyFormCompleted();
	});
</script>

<form
	bind:this={formElement}
	class="form-group"
	on:input={verifyFormCompleted}
	on:submit|preventDefault
>
	<div class="form-group__subgroup">
		<h5>How would you like to pay?</h5>
		{#if true}
			<RadioGroup bind:value={paymentMethod}>
				<RadioInput name="test" value="cc" width="100%">Paypal</RadioInput>
				<RadioInput name="test" value="paypal" width="100%">Credit or Debit Card</RadioInput>
			</RadioGroup>
		{:else}
			<p>Loading....</p>
		{/if}
	</div>

	<div class="form-group__subgroup">
		<h5>Enter your payment details</h5>
		<TextInput name="test" placeholder="Name on card" required size="large" value="Jane Doe" />
		<TextInput
			name="test"
			placeholder="Card number"
			size="large"
			required
			value="4242424 424 24 2424"
		/>
		<TextInput name="test" placeholder="Address" size="large" required value="123 Wallaby Way." />
		<span class="text-terms"
			>I have read and consent to eShopWorld processing my information in accordance with the
			Privacy Statement and Cookie Policy.
		</span>
	</div>

	<SquareButton width="100%" outlined disabled={!formComplete} size="small" on:click>
		Place Order
	</SquareButton>
</form>

<style lang="scss">
	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
</style>
