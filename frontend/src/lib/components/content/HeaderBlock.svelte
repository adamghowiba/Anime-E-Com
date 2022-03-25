<script lang="ts">
	import Button from '../global/Button.svelte';
	import type { ContentAlign } from '$lib/types/types';

	interface ButtonData {
		text: string;
		link: string;
	}

	export let title: string;
	export let subtitle: string;
	export let color: string = 'white';
	export let button: ButtonData;
	export let contentAlign: ContentAlign = 'left';
</script>

<div class="block {contentAlign}" style="--color: {color}">
	<h2>{title}</h2>
	<p>{subtitle}</p>
	<Button buttonColor="white">Shop</Button>
</div>

<style lang="scss">
	.block {
		display: flex;
		flex-direction: column;
		color: var(--color);
		gap: 2rem;
		z-index: 1;

		h2 {
			font-weight: var(--fw-bold);
			color: var(--color);
			text-transform: uppercase;
		}

		&.center, &.btm-center {
			justify-content: center;
			align-items: center;
		}
	}
</style>
