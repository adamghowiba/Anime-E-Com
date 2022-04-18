<script lang="ts">
	import { fly } from 'svelte/transition';
	export let title: string;
	export let isActive: boolean = false;
	export let isCompleted: boolean = false;
</script>

<div class="capture" class:isActive class:isCompleted>
	<h4>{title}</h4>

	{#if isCompleted}
		<slot name="completed" />
	{:else if isActive}
		<div class="capture__data" in:fly={{ duration: 390, y: -20 }}>
			<slot />
		</div>
	{/if}

	<hr />
	<!-- {#if isActive || isCompleted}
		<div class="capture__data" transition:slide>
			<slot />
		</div>
	{/if} -->
</div>

<style lang="scss">
	.capture {
		display: flex;
		flex-direction: column;
		gap: 20px;
		// border: 1px solid red;

		h4 {
			color: #969696;
			transition: color 0.15s linear;
			font-size: 25px;
			text-transform: capitalize;
		}

		&.isActive h4,
		&.isCompleted h4 {
			color: black;
		}
		&.isCompleted {
			gap: 10px;
		}

		hr {
			border: none;
			border-top: 1px solid var(--color-gray-s1);
			width: 100%;
			margin: 0;
			padding: 0;
		}
	}
</style>
