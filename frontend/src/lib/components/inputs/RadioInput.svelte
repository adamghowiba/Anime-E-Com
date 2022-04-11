<script lang="ts">
	import { getContext } from 'svelte';

	export let name: string;
	export let value: any;

	export let width: string = '71px';
	export let height: string = '48px';
	export let border: boolean = true;

	const { setSelectedValue, selectedValue } = getContext('select');
</script>

<label
	class="radio"
	style="--width: {width}; --height: {height};"
	style:border={border ? '1px solid black' : 'none'}
	on:click={() => setSelectedValue(value)}
	class:selected={$selectedValue === value}
>
	<input type="radio" {name} {value} />
	<slot />
</label>

<style lang="scss">
	.radio {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--width, 71px);
		min-height: var(--height, 48px);
		height: auto;
		width: auto;
		padding: 0 12px;
		border: 1px solid black;
		transition: background-color 0.085s linear, color 0.085s linear;

		&.selected {
			background-color: black;
			color: white;
		}

        &:hover {
            background-color: black;
            color: white;
        }

		:global(img) {
			width: var(--width);
			height: var(--height);
			object-fit: contain;
		}
	}
	input {
		position: absolute;
		display: block;
		appearance: none;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
