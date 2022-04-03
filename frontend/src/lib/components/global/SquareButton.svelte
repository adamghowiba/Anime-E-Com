<script lang="ts">
	import Icon from '@iconify/svelte';
	type ButtonColor = 'white' | 'black' | 'gray';
	type ButtonSize = 'small' | 'base' | 'large';
	type JustifyContent = 'center' | 'space-between';

	export let outlined: boolean = false;
	export let href: string = null;
	export let icon: string = 'bi:arrow-down';
	export let hover: boolean = true;
	export let disabled: boolean = false;

	/* Style Options */
	export let buttonColor: ButtonColor = 'white';
	export let width: string = 'max-content';
	export let margin: string = 'none';
	export let size: ButtonSize = 'base';
	export let justify: JustifyContent = 'center';
	export let border: string = 'none';
</script>

<div
	style:border
	class="wrapper {buttonColor} {size}"
	style="--width: {width}; --margin: {margin}; --justify: {justify}"
>
	{#if href}
		<a class:outlined {href} class:hover class:disabled><slot /></a>
	{:else}
		<button class:outlined class:hover class:disabled {disabled} on:click>
			<slot />
			{#if icon}
				<Icon
					{icon}
					rotate={icon === 'bi:arrow-down' ? '270deg' : 0}
					color="inherit"
					width={18}
					height={18}
				/>
			{/if}
		</button>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		width: var(--width);
	}
	button {
		appearance: none;
		border: none;
		outline: none;
	}
	button,
	a {
		display: inline-flex;
		width: var(--width, max-content);
		margin: var(--margin, none);
		gap: 14px;
		background-color: white;
		padding: 15px 25px;
		font-weight: var(--fw-black);
		text-transform: uppercase;
		align-items: center;
		justify-content: var(--justify, center);
		letter-spacing: 1px;
		position: relative;
		transition: background-color 0.15s linear, color 0.15s linear;

		&:hover {
			background-color: black;
			color: white;
			cursor: pointer;
		}

		&.outlined::before {
			content: '';
			pointer-events: none;
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			border: 1px solid white;
			bottom: 0;
			right: 0;
			transform: translate(5px, 5px);
			transition: transform 0.15s ease-out, border-color 0.15s ease-out;
		}

		&.outlined::before {
			border-color: inherit;
		}
	}

	/* Size Varients */
	.small button,
	.small a {
		padding: 12px 20px;
		font-size: 12px;
	}

	/* Color Varients */
	.black button,
	.black a {
		color: white;
		background-color: black;
		border: 1px solid black;

		&:not(.disabled).hover:hover {
			background-color: white;
			color: black;
		}
	}

	.white button,
	.white a {
		background-color: white;
		color: black;

		&.outlined::before {
			border-color: white;
		}

		&.hover:hover {
			background-color: black;
			color: white;
		}

		&.outlined:hover::before {
			transform: translate(0, 0);
			border-color: black;
		}
	}

	.disabled {
		background-color: #767676 !important;

		&:hover {
			cursor: not-allowed !important;
		}
	}
</style>
