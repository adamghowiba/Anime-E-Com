<script lang="ts">
	import HeaderBlock from '../content/HeaderBlock.svelte';
	import type { ContentAlign } from '$lib/types/types';

	export let title: string;
	export let subtitle: string;
	export let button: { link: string; text: string };
	export let height: number = 80;
	export let videoSrc: string = null;
	export let imgSrc: string = null;
	export let contentAlign: ContentAlign = 'left';
</script>

<div class="hero {contentAlign}" style="--height: {height}vh">
	<div class="overlay overlay--fade" />
	{#if videoSrc}
		<video autoplay loop muted>
			<source src={videoSrc} type="video/mp4" />
			<img src="/images/attack_titan.jpg" alt="" />
		</video>
	{:else if imgSrc}
		<img src={imgSrc} alt="" />
	{/if}

	<div class="hero__content">
		<HeaderBlock {title} {subtitle} {button} {contentAlign} color="white" />
	</div>
</div>

<style lang="scss">
	.hero {
		position: relative;
		// margin: 2rem 0;

		img,
		video {
			display: block;
			height: var(--height, 80vh);
			width: 100%;
			object-fit: cover;
		}

		&__content {
			padding: 0 3rem;
			max-width: 40ch;
			position: absolute;
		}

		&.left &__content {
			top: 50%;
			transform: translate(0, -50%);
		}

		&.center &__content {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
		}

		&.btm-center &__content {
			bottom: 3rem;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
		}
	}
</style>
