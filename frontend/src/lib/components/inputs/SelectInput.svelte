<script lang="ts">
	import Icon from '@iconify/svelte';
	type InputSize = 'base' | 'large';

	export let label: string = null;
	export let required: boolean = false;
	export let values: string[] | { text: string; value: string }[] = [];
	export let value: string;
	export let name: string;
	export let size: InputSize = 'base';
	export let placeholder: string;
</script>

<div class="input-wrapper {size}">
	{#if label}
		<label for={name}>
			{label}
			{#if required} * {/if}
		</label>
	{/if}
	<select {name} bind:value {required}>
		<option value="" selected hidden disabled>{placeholder}</option>
		{#each values as value, i}
			{#if typeof value === 'string'}
				<option {value}> {value}</option>
			{:else}
				<option value={value.value}> {value.text}</option>
			{/if}
		{/each}
	</select>

	<div class="dropdown-icon">
		<Icon icon="akar-icons:chevron-down" />
	</div>
</div>

<style lang="scss">
	label {
		color: #6e6e6e;
		text-transform: uppercase;
		font-size: 11px;
		font-weight: var(--fw-bold);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	select {
		appearance: none;
		-webkit-appearance: none;
		background-color: transparent;
		color: inherit;
		border: 1px solid var(--color-gray-s1);
		outline: none;
		width: 100%;
		// max-width: 267px;
		padding: 12px 12px;
		font-size: 12px;
		text-transform: capitalize;
	}
	.dropdown-icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 1rem;
	}
	option {
		text-transform: capitalize;
	}
</style>
