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

<div class="input-wrapper {size}" class:error>
	{#if label}
		<label for={name}>
			{label}
			{#if required} * {/if}
		</label>
	{/if}

	<div class="input-wrap">
		{#if type == 'text'}
			<input type="text" on:blur={handleInputBlur} {name} {required} bind:value />
		{:else if type == 'email'}
			<input type="email" on:blur={handleInputBlur} {name} {required} bind:value />
		{:else if type == 'password'}
			<input type="password" on:blur={handleInputBlur} {name} {required} bind:value />
		{:else if type == 'phone'}
			<input type="tel" on:blur={handleInputBlur} {name} {required} bind:value />
		{/if}

		{#if !label}
			<span class="placeholder" class:active={value}>{placeholder}</span>
		{/if}
	</div>

	{#if error}
		<span class="error__message">{error}</span>
	{/if}
</div>

<style lang="scss">
	@mixin activePlaceholder {
		top: 0;
		transform: translateY(-50%);
		font-size: 12px;
	}

	.input-wrap {
		position: relative;
	}
	.placeholder {
		position: absolute;
		background-color: white;
		pointer-events: none;
		padding: 0 3px;
		left: 9px;
		top: 50%;
		transform: translateY(-50%);
		font-size: inherit;
		transition: transform 0.15s ease-out, top 0.15s ease-out, font-size 0.15s ease-out;

		&.active {
			@include activePlaceholder;
		}
	}
	input:focus + .placeholder {
		@include activePlaceholder;
	}

	.large input:focus + .placeholder,
	.large .placeholder.active {
		@include activePlaceholder;
		font-size: 14px;
	}

	input {
		appearance: none;

		&:focus {
			box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.15);
		}
	}

	.error {
		input {
			border: 1px solid var(--color-red);
		}

		input:focus {
			box-shadow: 0 0 0 0.2rem rgb(255, 118, 118, 0.25);
		}

		&__message {
			color: var(--color-red);
			font-size: 14px;
		}
	}
</style>
