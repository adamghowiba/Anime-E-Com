<script lang="ts">
	import Icon from '@iconify/svelte';
	type ButtonColor = 'white' | 'black' | 'gray' | 'blue' | 'transparent';
	type ButtonSize = 'small' | 'base' | 'large';
	type JustifyContent = 'center' | 'space-between';

	export let outlined: boolean = false;
	export let href: string = null;
	export let icon: string = 'bi:arrow-down';
	export let flipIcon: boolean = false;
	export let hover: boolean = true;
	export let disabled: boolean = false;

	/* Style Options */
	export let buttonColor: ButtonColor = 'black';
	export let width: string = 'max-content';
	export let margin: string = 'none';
	export let size: ButtonSize = 'base';
	export let justify: JustifyContent = 'center';
	export let border: string = 'none';
</script>

<div
	style:border
	class:flipIcon
	class="wrapper {buttonColor} {size}"
	style="--width: {width}; --margin: {margin}; --justify: {justify}"
>
	{#if href}
		<a class:outlined {href} class:hover class:disabled>
			<slot />
			{#if icon}
				<Icon
					{icon}
					rotate={icon === 'bi:arrow-down' ? '270deg' : 0}
					color="inherit"
					width={18}
					height={18}
				/>
			{/if}</a
		>
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

		&.flipIcon a,
		&.flipIcon button {
			flex-direction: row-reverse;
		}
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
		font-size: 13.9px;
		font-weight: var(--fw-black);
		text-transform: uppercase;
		align-items: center;
		justify-content: var(--justify, center);
		letter-spacing: 1px;
		position: relative;
		transition: background-color 0.15s linear, color 0.15s linear;

		&:hover {
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

	.transparent button,
	.transparent a {
		font-weight: var(--fw-medium);
		background-color: transparent;
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
		border: 1px solid white;

		&.outlined::before {
			border-color: white;
		}

		&.hover:hover {
			background-color: black;
			color: white;
			border: 1px solid white;
		}
	}

	.gray button,
	.gray a {
		background-color: #53565a;
		border: 1px solid #53565a;
		color: white;

		&.hover:hover {
			background-color: white;
			color: black;
		}
	}

	.blue button,
	.blue a {
		background-color: #007db5;
		border: 1px solid #007db5;
		color: white;

		&.hover:hover {
			background-color: white;
			color: #007db5;
		}
	}

	.disabled {
		background-color: #767676 !important;

		&:hover {
			cursor: not-allowed !important;
		}
	}
</style>
