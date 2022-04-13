<script lang="ts">
	import Icon from '@iconify/svelte';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let name: string;
	export let expanded: boolean = false;

	export let filters = writable([]);
	export let value: any[] = [];

	$: filters.set(value);

	setContext('filters', {
		selectFilter: (filter) => {
			if ($filters.includes(filter)) {
				value = value.filter((vals) => vals !== filter);
				return;
			}

			value = [...$filters, filter];
		},
		filters: filters as Writable<string[]>
	});

	function handleGroupClick() {
		expanded = !expanded;
	}
</script>

<div class="group" class:collapsed={!expanded}>
	<div class="group__header" on:click={handleGroupClick}>
		<h6>{name}</h6>

		<div class="group__header__icon">
			<Icon icon="akar-icons:chevron-down" rotate={expanded ? 0 : 90} width={15} height={15} />
		</div>
	</div>

	{#if expanded}
		<div class="group__options">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.group {
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		border-top: 1px solid var(--color-gray-s2);
		padding: 12px 0;
		margin-bottom: 10px;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-transform: capitalize;

			&:hover {
				cursor: pointer;
			}
		}

		&__header__icon {
			position: relative;
			top: -2px;
		}

		&__options {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		&.collapsed {
			margin-bottom: 0px;
		}

		h6 {
			font-size: 14px;
			font-weight: var(--fw-semibold);
		}
	}
</style>
