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

	/* TODO: Do we need both? */
	export let error: string = null;
	export let isValid: boolean = false;

	function formatValidationMessage(inputElement: HTMLInputElement) {
		let validity = inputElement.validity;

		if (validity.valueMissing) {
			inputElement.setCustomValidity(`Please enter your ${placeholder.toLowerCase() || label}`);
			return;
		}

		inputElement.setCustomValidity('');
	}

	function handleInputBlur(event: FocusEvent) {
		const target = event.target as HTMLInputElement;

		formatValidationMessage(target);

		if (!target.checkValidity()) {
			isValid = false;
			error = target.validationMessage;
			return;
		}

		isValid = true;
		error = null;
	}
</script>

<div class="wrapper {size}" class:error>
	<label for={name}>
		{#if label}
			{label}
			{#if required} * {/if}
		{/if}
	</label>
	{#if type == 'text'}
		<input type="text" on:blur={handleInputBlur} {name} {placeholder} {required} bind:value />
	{:else if type == 'email'}
		<input type="email" on:blur={handleInputBlur} {name} {placeholder} {required} bind:value />
	{:else if type == 'password'}
		<input type="password" on:blur={handleInputBlur} {name} {placeholder} {required} bind:value />
	{:else if type == 'phone'}
		<input type="tel" on:blur={handleInputBlur} {name} {placeholder} {required} bind:value />
	{/if}

	{#if error}
		<span class="error__message">{error}</span>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.error {
		input {
			border: 1px solid var(--color-red);
		}

		&__message {
			color: var(--color-red);
			font-size: 14px;
		}
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
