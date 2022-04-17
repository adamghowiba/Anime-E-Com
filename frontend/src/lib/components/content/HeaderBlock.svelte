<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import type { ContentAlign } from '$lib/types/types';
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';

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
	<h2 class="text--title">{title}</h2>
	<p>{subtitle}</p>
	<SquareButton outlined buttonColor="white">Shop Now</SquareButton>
	<!-- <Button buttonColor="white">Shop</Button> -->
</div>

<style lang="scss">
	.block {
		position: relative;
		display: flex;
		flex-direction: column;
		color: var(--color);
		gap: 10px;

		h2 {
			font-weight: var(--fw-black);
			letter-spacing: 1.5px;
			color: var(--color);
			text-transform: uppercase;
			line-height: 1.3;
		}

		p {
			font-weight: var(--fw-light);
			margin-bottom: 20px;
			line-height: 1.3;
		}

		&.center,
		&.btm-center {
			justify-content: center;
			align-items: center;
		}
	}
</style>
