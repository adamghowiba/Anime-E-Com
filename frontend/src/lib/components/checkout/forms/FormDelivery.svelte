<script lang="ts">
	import type { Delivery } from '$lib/types/checkout';
import { onMount } from 'svelte';
	import SquareButton from '../../buttons/SquareButton.svelte';
	import TextInput from '../../inputs/TextInput.svelte';

	export let deliveryData: Delivery;
	let formComplete: boolean = false;
	let formElement: HTMLFormElement;

	function verifyFormCompleted() {
		if (!formElement.checkValidity()) {
			return (formComplete = false);
		}
		return (formComplete = true);
	}

	onMount(() => {
		verifyFormCompleted();
	})
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
			name="test"
			placeholder="First Name"
			required
			size="large"
			bind:value={deliveryData.shipping_address.first_name}
		/>
		<TextInput
			name="test"
			placeholder="Last Name"
			size="large"
			required
			bind:value={deliveryData.shipping_address.last_name}
		/>
		<TextInput
			name="test"
			placeholder="Address"
			size="large"
			required
			bind:value={deliveryData.shipping_address.street}
		/>
		<TextInput
			name="test"
			placeholder="City"
			size="large"
			required
			bind:value={deliveryData.shipping_address.city}
		/>
		<TextInput
			name="test"
			placeholder="State"
			size="large"
			required
			bind:value={deliveryData.shipping_address.state}
		/>
	</div>

	<div class="form-group__subgroup">
		<h5>What's your contact infomration?</h5>
		<TextInput
			name="test"
			placeholder="Email"
			type="email"
			size="large"
			required
			bind:value={deliveryData.email}
		/>
		<TextInput
			name="test"
			placeholder="Phone Number"
			size="large"
			type="phone"
			required
			bind:value={deliveryData.phone}
		/>
		<span class="text-terms"
			>I have read and consent to eShopWorld processing my information in accordance with the
			Privacy Statement and Cookie Policy.
		</span>
	</div>

	<SquareButton width="100%" outlined disabled={!formComplete} on:click>Continue</SquareButton>
</form>

<style lang="scss">
	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
</style>
