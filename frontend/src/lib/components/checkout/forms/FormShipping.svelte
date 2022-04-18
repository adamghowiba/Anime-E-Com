<script lang="ts">
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import InfoBlock from '$lib/components/checkout/InfoBlock.svelte';
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import { checkoutData } from '$lib/stores/checkout-store';
	import type { ShippingMethod } from '@chec/commerce.js/types/shipping-method';

	export let shippingMethod: ShippingMethod[];

	$: isFormCompleted = Boolean($checkoutData.fulfillment);
</script>

<div class="form-group">
	<div class="form-group__subgroup">
		<h5>When would you like to get your order?</h5>
		{#if shippingMethod}
			<RadioGroup bind:value={$checkoutData.fulfillment}>
				{#each shippingMethod as method, i}
					<RadioInput
						name="test"
						value={method}
						width="100%"
						hoverEffect="none"
						selectEffect="border"
						border={true}
						selected={i === 0}
					>
						<InfoBlock title={method.description} desc="Arrives Apr 16 - Apr 19" padding="5px">
							{method.price.formatted_with_symbol}
						</InfoBlock>
					</RadioInput>
				{/each}
			</RadioGroup>
		{:else}
			<p>Loading....</p>
		{/if}
	</div>

	<SquareButton width="100%" outlined size="small" on:click disabled={!isFormCompleted}>
		Continue
	</SquareButton>
</div>

<style lang="scss">
	.form-group {
		gap: 2rem;

		&__subgroup {
			gap: 1.5rem;
		}
	}

	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
</style>
