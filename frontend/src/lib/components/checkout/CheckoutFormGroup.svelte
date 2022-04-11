<script lang="ts">
	import { slide } from 'svelte/transition';

	export let title: string;
	export let isActive: boolean = false;
	export let isCompleted: boolean = false;
</script>

<div class="capture" class:isActive class:isCompleted>
	<div class="capture__header">
		<h4>{title}</h4>
		<hr />
	</div>

	{#if isCompleted}
		<slot name="completed" />
	{:else if isActive}
		<div class="capture__data" in:slide>
			<slot />
		</div>
	{/if}

	<!-- {#if isActive || isCompleted}
		<div class="capture__data" transition:slide>
			<slot />
		</div>
	{/if} -->
</div>

<style lang="scss">
	.capture {
		&__header {
			display: flex;
			flex-direction: column;
			justify-content: stretch;
			gap: 12px;
			padding: 12px 0;
		}

		h4 {
			color: #969696;
			transition: color 0.15s linear;
		}

		&__data {
		}

		&.isActive h4 {
			color: black;
			// font-weight: var(--fw-semibold);
		}

		&.isActive &__data {
			padding: 24px 0;
			padding-bottom: 48px;
		}

		&.isCompleted &__data {
			padding: 0px;
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
