<script lang="ts">
	import type { CheckDiscountResponse } from '@chec/commerce.js/features/checkout';
	import type { Discount } from '@chec/commerce.js/types/discount';
	import Skeleton from '../skeleton/Skeleton.svelte';

	export let discount: CheckDiscountResponse = null;
	export let total: string | number;
	export let subtotal: string | number = null;
</script>

<div class="summary">
	<h4>ORDER Summary</h4>
	{#if subtotal || discount}
		<div class="summary__items">
			<div class="summary__item summary__item--subtotal">
				<span>Subtotal</span>
				<span>{subtotal}</span>
			</div>
			{#if discount && discount?.valid}
				<div class="summary__item summary__item--promo">
					<span>Discount ({discount.code})</span>
					<span class="summary__saved">- {discount.amount_saved.formatted_with_symbol}</span>
				</div>
				<hr />
			{/if}
		</div>
	{/if}

	<h6>
		TOTAL
		<span>
			{#if total}
				${total}
			{:else}
				<Skeleton width="70px" height="7px" />
			{/if}
		</span>
	</h6>
</div>

<style lang="scss">
	.summary {
		border: 1px solid var(--color-gray-s2);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 20px;
		font-weight: var(--fw-medium);
		text-transform: uppercase;

		&__items {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__item {
			display: flex;
			justify-content: space-between;
		}

		&__saved {
			color: var(--color-red);
		}

		hr {
			border: none;
			border-top: 1px solid gray;
			width: 100%;
		}

		h4 {
			font-weight: var(--fw-semibold);
		}

		h6 {
			font-size: var(--text-base);
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
