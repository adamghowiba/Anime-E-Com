<script lang="ts">
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import RadioGroup from '$lib/components/inputs/RadioGroup.svelte';
	import RadioInput from '$lib/components/inputs/RadioInput.svelte';
	import InfoBlock from '$lib/components/checkout/InfoBlock.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { onMount } from 'svelte';
	import { commerce } from '$lib/commerce/commerce';
	import type { ShippingMethod } from '@chec/commerce.js/types/shipping-method';

	export let checkoutData: ShippingMethod;
	export let shippingMethod: ShippingMethod[];

	$: console.log(shippingMethod);
</script>

<div class="form-group">
	<div class="form-group__subgroup">
		<h5>When would you like to get your order?</h5>
		{#if shippingMethod}
			<RadioGroup bind:value={checkoutData}>
				{#each shippingMethod as method}
					<RadioInput name="test" value={method} width="100%">
						<InfoBlock title={method.description} desc="Arrives Apr 16 - Apr 19"
							>{method.price.formatted_with_symbol}</InfoBlock
						>
					</RadioInput>
				{/each}
			</RadioGroup>
		{:else}
			<p>Loading....</p>
		{/if}
	</div>

	<SquareButton width="100%" outlined size="small" on:click>Continue</SquareButton>
</div>

<style lang="scss">
	h5 {
		font-size: 18px;
		color: black;
		font-weight: var(--fw-medium);
	}
</style>
