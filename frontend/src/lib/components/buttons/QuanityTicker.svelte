<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let quantity: number;
	export let updatingQuantity: boolean;

	const dispatch = createEventDispatcher();

	let iconSize = 15;
</script>

<div class="quantity" class:updatingQuantity>
	<button class="quantity__action quantity__action--remove" on:click={() => dispatch('remove')}>
		<Icon icon="akar-icons:minus" color="inherit" width={iconSize} height={iconSize} />
	</button>

	<span>{quantity}</span>

	<button class="quantity__action quantity__action--add" on:click={() => dispatch('add')}>
		<Icon icon="akar-icons:plus" color="inherit" width={iconSize} height={iconSize} />
	</button>
</div>

<style lang="scss">
	.quantity {
		height: 30px;
		min-width: 90px;
		// border: 1px solid var(--color-gray-s1);
		margin-right: auto;
		display: flex;
		gap: 7px;
		align-items: center;
		align-items: center;
		color: #949494;

		&.updatingQuantity &__action {
			opacity: 0.24;
		}

		span {
			position: relative;
			font-size: var(--text-sm);
		}

		button {
			appearance: none;
			border: none;
			background-color: transparent;
			outline: none;
		}
	}

	.quantity__action {
		height: 100%;
		padding: 5px 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: opacity 0.15s linear;
		
		&:hover {
			cursor: pointer;
		}
	}
</style>
