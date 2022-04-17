<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	export let selectedValue = writable<any>();
	export let value: any;
	export let width: string = '100%';

	const dispatch = createEventDispatcher();

	$: selectedValue.set(value);

	setContext('select', {
		setSelectedValue: (val: any) => {
			dispatch('select', val);
			value = val;
		},
		selectedValue
	});
</script>

<div class="group" style:width>
	<slot />
</div>

<style lang="scss">
	.group {
		display: flex;
		// display: grid;
		// grid-template-columns: repeat(auto-fit, minmax(75px, auto));
		flex-wrap: wrap;
		gap: 10px;
		width: 100%;
	}

	/* Tablet */
	@media screen and (max-width: 768px) {
		.group {
			flex-wrap: nowrap;
		}
	}
</style>
