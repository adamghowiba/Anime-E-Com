<script lang="ts">
	type InputType = 'password' | 'text' | 'email' | 'phone';
	type InputSize = 'base' | 'large';
	export let placeholder: string = null;
	export let label: string = null;
	export let required: boolean = false;
	export let value: string;
	export let name: string;
	export let type: InputType = 'text';
	export let size: InputSize = 'base';
</script>

<div class="wrapper {size}">
	<label for={name}>
		{#if label}
			{label}
			{#if required} * {/if}
		{/if}
	</label>
	{#if type == 'text'}
		<input type="text" {name} {placeholder} {required} bind:value />
	{:else if type == 'email'}
		<input type="email" {name} {placeholder} {required} bind:value />
	{:else if type == 'password'}
		<input type="password" {name} {placeholder} {required} bind:value />
	{:else if type == 'phone'}
		<input type="phone" {name} {placeholder} {required} bind:value />
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	label {
		color: #6e6e6e;
		text-transform: uppercase;
		font-size: 11px;
		width: 100%;
		font-weight: var(--fw-bold);
	}
	input {
		appearance: none;
		outline: none;
		border: 1px solid var(--color-gray-s1);
		width: 100%;
		// max-width: 267px;
		padding: 12px 12px;
		font-size: 12px;
		transition: box-shadow 0.15s ease-out;

		&:focus {
			border: 1px solid black;
			box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.25);
		}
	}

	/* Size Styles */
	.large {
		gap: 10px;
		input {
			padding: 16px 12px;
			font-size: 16px;
		}
		label {
			font-size: 14px;
		}	
	}
</style>
