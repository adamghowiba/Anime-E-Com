<script lang="ts">
	export let label: string = null;
	export let required: boolean = false;
	export let values: string[] = [];
	export let value: string;
	export let name: string;
</script>

<label for={name}>
	{#if label}{label}{/if}
	{#if required}*{/if}
	<select {name} bind:value>
		{#each values as value, i}
			{#if i == 0}
				<option {value} selected> {value}</option>
			{:else}
				<option {value}> {value}</option>
			{/if}
		{/each}
	</select>
</label>

<style lang="scss">
	label {
		color: #6e6e6e;
		text-transform: uppercase;
		font-size: 11px;
		font-weight: var(--fw-bold);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	select {
		// appearance: none;
		border: 1px solid var(--color-gray-s1);
		width: 100%;
		// max-width: 267px;
		padding: 12px 12px;
		font-size: 12px;
		text-transform: capitalize;
	}
	option {
		text-transform: capitalize;
	}
</style>
