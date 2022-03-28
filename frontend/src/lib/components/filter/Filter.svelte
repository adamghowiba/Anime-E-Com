<script lang="ts">
	import Icon from '@iconify/svelte';
	import FilterGroup from './FilterGroup.svelte';
	import FilterOption from './FilterOption.svelte';

	// export let filters = {
	// 	brand: [],
	// 	size: [],
	// 	color: [],
	// 	type: []
	// };

	export let filters: string[] = [];

	function removeFilter(filter: string) {
		filters = filters.filter((filterItem) => filterItem !== filter);
	}

	$: console.log(filters);
</script>

<div class="filter">
	{#if filters.length >= 1}
		<div class="filter__filters">
			{#each filters as filter}
				<div class="filter__badge" on:click={() => removeFilter(filter)}>
					<span>{filter} </span>
					<Icon icon="ep:close-bold" />
				</div>
			{/each}
		</div>
	{/if}

	<div class="filter__header">
		<p>FILTER BY</p>
		<span class="filter__clear" on:click={() => (filters = [])}>CLEAR ALL</span>
	</div>

	<FilterGroup name="brand" bind:value={filters} expanded>
		<FilterOption name="Tokyo Ghoul" value="tokyo-ghoul" />
		<FilterOption name="Attack On Titan" value="attack-on-titan" />
		<!-- <FilterOption name="FIT" value="fit" /> -->
	</FilterGroup>
	<FilterGroup name="Type" bind:value={filters} expanded>
		<FilterOption name="T-Shirts" value="t-shirts" />
		<FilterOption name="Hoodies" value="hoodies" />
	</FilterGroup>

	<FilterGroup name="Color" bind:value={filters}>
		<FilterOption name="Red" value="red" />
		<FilterOption name="green" value="green" />
		<FilterOption name="white" value="white" />
	</FilterGroup>
</div>

<style lang="scss">
	.filter {
		max-width: 278px;
		width: 100%;
		border: 1px solid var(--color-gray-s1);
		height: 100%;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem;
		}

		&__filters {
			padding: 12px 1rem 0px 1rem;
			flex-wrap: wrap;
			display: flex;
			gap: 10px;
		}

		&__badge {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			gap: 7px;
			background-color: var(--color-gray-s2);
			border-radius: 4px;
			font-size: 12px;
			padding: 7px;
			text-transform: capitalize;
		}

		&__badge:hover {
			cursor: pointer;
		}

		&__clear {
			text-decoration: underline;
			font-weight: var(--fw-semibold);
			font-size: 14px;
		}

		&__clear:hover {
			cursor: pointer;
		}
	}
</style>
