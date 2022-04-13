<script lang="ts">
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import { slide } from 'svelte/transition';

	export let width: string = '100%';
	export let title: string;
	export let isExpanded: boolean = false;
</script>

<div class="help" style="--width: {width}">
	<SquareButton
		buttonColor="white"
		hover={false}
		icon="akar-icons:plus"
		size="small"
		justify="space-between"
		border="1px solid #D2D2D2"
		{width}
		on:click={() => (isExpanded = !isExpanded)}>{title}</SquareButton
	>

	{#if isExpanded}
		<!-- <hr class="help__divider" /> -->
		<div class="help__dropdown" transition:slide={{ duration: 250 }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.help {
		width: var(--width, 500px);

		&__dropdown {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			background-color: white;
			border: 1px solid #d2d2d2;
			border-top: none;
			padding: 20px 25px 20px 25px;
		}

		hr {
			margin: 0;
			border: none;
			border-top: 1px solid #d2d2d2;
		}

		:global(ul) {
			margin: 0;
			padding-left: 15px;
		}
	}
</style>
