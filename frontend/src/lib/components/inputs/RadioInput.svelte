<script lang="ts">
	import { getContext } from 'svelte';

	type SelectEffect = 'fill' | 'border';

	export let name: string;
	export let value: any;

	export let width: string = '71px';
	export let height: string = '48px';
	export let border: boolean = true;
	export let borderColor: string = 'black';
	export let hoverable: boolean = true;
	export let selectEffect: SelectEffect = 'fill';

	const { setSelectedValue, selectedValue } = getContext('select');
</script>

<label
	class="radio selected--{selectEffect}"
	style="--width: {width}; --height: {height};"
	class:hoverable
	class:selected={$selectedValue === value}
	style:border={border ? `1px solid ${borderColor}` : 'none'}
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
		min-width: var(--width, 71px);
		min-height: var(--height, 48px);
		height: auto;
		width: auto;
		border: 1px solid black;
		transition: background-color 0.085s linear, color 0.085s linear, border-color 0.15s ease-out;

		&.selected {
			&.selected--fill {
				background-color: black;
				color: white;
			}

			&.selected--border {
				border: 1px solid black !important;
			}
		}

		&.hoverable:hover {
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

		&:hover {
			cursor: pointer;
		}
	}
</style>
