<script lang="ts">
	import { getContext } from 'svelte';
	import Checkbox from '../inputs/Checkbox.svelte';

	export let name: string;
	export let value: string;

	const { selectFilter, filters } = getContext('filters');
</script>

<label for={name} on:click={() => selectFilter(value)}>
	<Checkbox {name} {value} checked={$filters.includes(value)} />
	<!-- <input type="checkbox" {name} {value} checked={$filters.includes(value)} /> -->
	{name}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: var(--text-sm);
	}
</style>
