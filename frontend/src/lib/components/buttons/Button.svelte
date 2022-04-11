<script lang="ts">
	type ButtonColor = 'white' | 'black' | 'gray';

	export let buttonColor: ButtonColor = 'white';
	export let href: string = null;
	export let width: string = 'max-content';
	export let margin: string = 'none';
</script>

{#if href}
	<a {href} style="--width: {width}; --margin: {margin}" class={buttonColor}><slot /></a>
{:else}
	<button on:click style="--width: {width}; --margin: {margin}" class={buttonColor}><slot /></button>
{/if}

<style lang="scss">
	button {
		appearance: none;
		border: none;
		outline: none;
		font-size: var(--text-base);
	}
	a,
	button {
		background-color: var(--buttonColor, white);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: var(--width, max-content);
		border-radius: 40px;
		min-width: 100px;
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		padding: 14px 2rem;
		margin: var(--margin, none);

		&.black {
			color: white;
			background-color: black;
		}

		&.white {
			background-color: white;
			color: black;
		}
	}
</style>
