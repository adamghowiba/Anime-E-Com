<script lang="ts">
	import { getContext } from 'svelte';

	export let name: string;
	export let value: string;

	const { selectFilter, filters } = getContext('filters');
</script>

<label for={name} on:click={() => selectFilter(value)}>
	<input type="checkbox" {name} {value} checked={$filters.includes(value)} />
	{name}
</label>

<style lang="scss">
	label {
		font-size: var(--text-sm);
	}
</style>
