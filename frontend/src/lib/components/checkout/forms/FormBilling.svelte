<script lang="ts">
	import type { Address } from '$lib/types/checkout';
	import SquareButton from '../../buttons/SquareButton.svelte';
	import TextInput from '../../inputs/TextInput.svelte';

	export let billingData: Address;
	export let billingSameAsShipping: boolean;
</script>

<div class="form-group">
	<div class="matches">
		<input type="checkbox" name="" id="" bind:checked={billingSameAsShipping} />
		<span>Billing matches shipping address </span>
	</div>

	{#if !billingSameAsShipping}
		<div class="form-group__subgroup">
			<h5>Enter your name and address</h5>
			<TextInput
				name="test"
				placeholder="First Name"
				bind:value={billingData.first_name}
				size="large"
			/>
			<TextInput
				name="test"
				placeholder="Last Name"
				bind:value={billingData.last_name}
				size="large"
			/>
			<TextInput name="test" placeholder="Address" bind:value={billingData.street} size="large" />
			<TextInput name="test" placeholder="City" bind:value={billingData.city} size="large" />
			<TextInput name="test" placeholder="State" bind:value={billingData.state} size="large" />
		</div>
	{/if}

	<SquareButton width="100%" outlined on:click>Continue</SquareButton>
</div>

<style lang="scss">
	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
</style>
