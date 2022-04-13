<script lang="ts" context="module">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = async ({ status, error }) => {
		return {
			props: {
				status,
				error
			}
		};
	};
</script>

<script lang="ts">
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';

	export let status: number;
	export let error: Error;

	interface ErrorData {
		title: string;
		subtitle?: string;
		icon?: { src: string; size?: number };
	}

	const errorMap = new Map<number, ErrorData>([
		[
			500,
			{
				title: 'Uh, oh. Something went wrong.',
				subtitle: "Something bad happened and we don't know how to handle it",
				icon: { src: '401_icon.svg' }
			}
		],
		[
			503,
			{
				title: 'Houston we have a problem...',
				subtitle: 'This product is not completed yet. Please hang tight.',
				icon: { src: '401_icon.svg' }
			}
		],
		[
			400,
			{
				title: "We can't seem to find that product.",
				subtitle: "Well this is akward, but we can't find the product you're looking for.",
				icon: { src: '404_icon.svg', size: 250 }
			}
		]
	]);

	function getErrorFormat(status: number): ErrorData {
		if (!errorMap.has(status)) return { title: "Something went wrong.... We're sorry :(" };

		return errorMap.get(status);
	}

	$: errorFormat = getErrorFormat(status);
</script>

<section class="error container container--md">
	{#if errorFormat.icon}
		<img
			src="/icons/{errorFormat.icon.src}"
			alt="{status} error icon"
			style:max-width={`${errorFormat.icon?.size || 200}px`}
		/>
	{/if}
	<h2 class="error__title">{errorFormat.title}</h2>
	<p class="error__message">{errorFormat.subtitle ?? `Error: ${status} ${error.message}`}</p>
	<p class="error__stack">{error.stack.substring(0, 200)}</p>
	<SquareButton>Return Home</SquareButton>
</section>

<style lang="scss">
	.error {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 100%;
		gap: 1rem;
		margin: 2rem auto;

		img {
			max-width: 200px;
		}

		&__title {
			max-width: 25ch;
		}
		&__stack {
			max-width: 70ch;
			line-height: 1.4;
			text-align: left;
		}
	}
</style>
