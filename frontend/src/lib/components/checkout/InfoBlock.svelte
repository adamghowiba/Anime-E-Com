<script lang="ts">
	import RadioInput from '../inputs/RadioInput.svelte';

	export let title: string;
	export let desc: string = null;
	export let actionable: boolean = false;
	export let padding: string = '2px 0px';
</script>

<div class="block" style:padding>
	<div class="block__info">
		<span class="block__title">{title}</span>
		{#if desc}
			<span class="block__desc">{desc}</span>
		{/if}
	</div>

	<div class="block__action">
		{#if actionable}
			<div class="block__action-wrap" on:click>
				<slot />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
</div>

<style lang="scss">
	.block {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;

		&__info {
			display: flex;
			gap: 4px;
			max-width: 20ch;
			flex-direction: column;
			padding: 12px 0px;
		}

		&__title {
			font-weight: var(--fw-medium);
			color: black;
		}

		&__desc {
			color: #969696;
		}

		&__action-wrap {
			text-decoration: underline;
		}

		&__action-wrap:hover {
			cursor: pointer;
		}
	}
</style>
