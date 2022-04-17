<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import type { Category } from '@chec/commerce.js/types/category';
	import Icon from '@iconify/svelte';
	import Skeleton from '../skeleton/Skeleton.svelte';
	import FilterGroup from './FilterGroup.svelte';
	import FilterOption from './FilterOption.svelte';

	export let selectedFilters: string[] = [];
	export let filterOptions: Category[];

	function removeFilter(filter: string) {
		selectedFilters = selectedFilters.filter((filterItem) => filterItem !== filter);
	}
</script>

<div class="filter">
	{#if selectedFilters.length >= 1}
		<div class="filter__filters">
			{#each selectedFilters as filter}
				<div class="filter__badge" on:click={() => removeFilter(filter)}>
					<span>{filter} </span>
					<Icon icon="ep:close-bold" />
				</div>
			{/each}
		</div>
	{/if}

	<div class="filter__header">
		<p>FILTER BY</p>
		<span class="filter__clear" on:click={() => (selectedFilters = [])}>CLEAR ALL</span>
	</div>

	{#if filterOptions}
		{#each filterOptions as option}
			{#if option.children && option.children.length > 0}
				<FilterGroup name={option.name} bind:value={selectedFilters} expanded>
					{#each option.children as child}
						<FilterOption name={child.name} value={child.slug} />
					{/each}
				</FilterGroup>
			{/if}
		{/each}

		<FilterGroup name="Color" bind:value={selectedFilters} expanded>
			<FilterOption name="red" value="red" />
			<FilterOption name="green" value="green" />
			<FilterOption name="white" value="white" />
			<FilterOption name="black" value="black" />
		</FilterGroup>
	{/if}
</div>

<style lang="scss">
	.filter {
		width: 100%;
		height: auto;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 0;
		}

		&__filters {
			padding: 12px 1rem 0px 0px;
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
