<script lang="ts">
	import Icon from '@iconify/svelte';
	type ButtonColor = 'white' | 'black' | 'gray';

	export let outlined: boolean = false;
	export let buttonColor: ButtonColor = 'white';
	export let href: string = null;
	export let width: string = 'max-content';
	export let margin: string = 'none';
</script>

<div class="wrapper {buttonColor}" style="--width: {width}; --margin: {margin}">
	{#if href}
		<a class:outlined {href}><slot /></a>
	{:else}
		<button class:outlined>
			<slot />

			<Icon icon="bi:arrow-down" rotate="270deg" width={18} height={18} />
		</button>
	{/if}
</div>

<style lang="scss">
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
		justify-content: center;
		letter-spacing: 1px;
		position: relative;
		transition: background-color 0.15s linear, color 0.15s linear;

		&:hover {
			background-color: black;
			color: white;
		}

		&.outlined:hover::before {
			transform: translate(0, 0);
			border-color: black;
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
	}
	.black button,
	.black a {
		color: white;
		background-color: black;

		&.outlined::before {
			border-color: black;
		}

		&:hover {
			background-color: white;
			color: black;
		}

		&.outlined:hover::before {
			border-color: black;
		}
	}

	.white button,
	.white a {
		background-color: white;
		color: black;

		&.outlined::before {
			border-color: white;
		}

		&:hover {
			background-color: black;
			color: white;
		}

		&.outlined:hover::before {
			border-color: black;
		}
	}
</style>
