<script lang="ts">
	type InputType = 'password' | 'text' | 'email' | 'phone';

	export let placeholder: string = null;
	export let label: string = null;
	export let required: boolean = false;
	export let value: string;
	export let name: string;
	export let type: InputType = 'text';
</script>

<label for={name}>
	{label}
	{#if required} * {/if}
	{#if type == 'text'}
		<input type="text" {name} {placeholder} {required} />
	{:else if type == 'email'}
		<input type="email" {name} {placeholder} {required} />
	{:else if type == 'password'}
		<input type="password" {name} {placeholder} {required} />
	{:else if type == 'phone'}
		<input type="phone" {name} {placeholder} {required} />
	{/if}
</label>

<style lang="scss">
	label {
		color: #6e6e6e;
		text-transform: uppercase;
		font-size: 11px;
		width: 100%;
		font-weight: var(--fw-bold);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	input {
		appearance: none;
		border: 1px solid var(--color-gray-s1);
		width: 100%;
		// max-width: 267px;
		padding: 12px 12px;
		font-size: 12px;
	}
</style>
