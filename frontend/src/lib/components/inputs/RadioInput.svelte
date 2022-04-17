<script lang="ts">
	import { getContext } from 'svelte';

	type ActionEffect = 'fill' | 'border' | 'none';

	export let name: string;
	export let value: any;

	export let width: string = '71px';
	export let height: string = '48px';
	export let border: boolean = true;
	export let borderColor: string = 'black';
	export let selectEffect: ActionEffect = 'fill';
	export let hoverEffect: ActionEffect = 'fill';
	export let selected: boolean = false;

	const { setSelectedValue, selectedValue } = getContext('select');
</script>

<label
	class="radio selected--{selectEffect} hover--{hoverEffect}"
	style="--width: {width}; --height: {height};"
	class:selected={$selectedValue === value || selected}
	style:border={border ? `1px solid ${borderColor}` : 'none'}
	on:mouseenter
	on:click={() => setSelectedValue(value)}
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
		min-width: 71px;
		min-height: 48px;
		height: var(--height);
		// width: var(--width);
		border: 1px solid black;
		transition: background-color 0.085s linear, color 0.085s linear, border-color 0.15s ease-out;

		/* Selected Effects */
		&.selected {
			&.selected--fill {
				background-color: black;
				color: white;
			}

			&.selected--border {
				border: 1px solid black !important;
			}
		}

		/* Hover Effects */
		&.hover--fill:hover {
			background-color: black;
			color: white;
		}

		&.hover--border:hover {
			border: 1px solid black !important;
		}

		&.hoverable:hover {
			background-color: black;
			color: white;
		}

		:global(img) {
			display: block;
			height: auto;
			width: 100%;
			max-width: 76px;
			background-color: white;
			object-fit: contain;
		}
	}
	input {
		position: absolute;
		display: block;
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;

		&:hover {
			cursor: pointer;
		}
	}
</style>
