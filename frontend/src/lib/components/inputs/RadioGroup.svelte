<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	export let selectedValue = writable<any>();
	export let value: any;

	$: selectedValue.set(value);

	setContext('select', {
		setSelectedValue: (val: any) => {
			value = val;
		},
		selectedValue
	});

</script>

<div class="group">
	<slot />
</div>

<style lang="scss">
	.group {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
</style>
