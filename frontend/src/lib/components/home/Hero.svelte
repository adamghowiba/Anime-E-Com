<script lang="ts">
	import HeaderBlock from '../content/HeaderBlock.svelte';
	import type { ContentAlign } from '$lib/types/types';
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import { gsap, Power3 } from 'gsap';

	export let title: string;
	export let subtitle: string;
	export let button: { link: string; text: string };
	export let height: number = 80;
	export let videoSrc: string = null;
	export let imgSrc: string = null;
	export let contentAlign: ContentAlign = 'left';

	let activeSliderIndex: number = 0;
	let controlActiveBlock: HTMLElement;

	let images = ['atsuko_people.jpg', 'attack_titan.jpg', 'atsuko_shirts.jpg', 'demon_slayer.jpg'];
	let imageIndexFlipped: boolean = false;

	let firstImageIndex = 0;
	let secondImageIndex = 1;

	function handleControlClick(index: number) {
		let controlBlockSize = 60;
		controlActiveBlock.style.transform = `translateX(${index * controlBlockSize}px)`;
		activeSliderIndex = index;
		console.log('Changed index', index);
	}
	const timeline = gsap.timeline();
</script>

<div class="hero {contentAlign}" style="--height: {height}vh">
	{#if videoSrc}
		<video autoplay loop muted>
			<source src={videoSrc} type="video/mp4" />
			<img src="/images/attack_titan.jpg" alt="" />
			<div class="overlay overlay--fade" />
		</video>
	{:else if imgSrc}
		<img class="first-image" src="/images/{images[activeSliderIndex]}" alt="" />
		<div class="overlay overlay--fade" />
	{/if}

	<div class="hero__content">
		<HeaderBlock {title} {subtitle} {button} {contentAlign} color="white" />
	</div>

	<div class="controls">
		<div class="controls__active-block" bind:this={controlActiveBlock} />
		{#each Array(4) as _, i}
			<div
				class="controls__action"
				on:click={() => handleControlClick(i)}
				class:active={activeSliderIndex == i}
			>
				0{i + 1}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.first-image {
		position: relative;
	}

	.overlay {
		top: 0;
		left: 0;
	}

	.controls {
		position: absolute;
		display: flex;
		right: 0;
		bottom: 0;
		background-color: white;

		&__action {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 60px;
			height: 60px;
			font-weight: var(--fw-bold);
			background-color: transparent;
			color: black;
			transition: color 0.25s ease-out;
		}

		&__action:hover:not(.active) {
			cursor: pointer;
			border: 1px solid var(--color-gray-s1);
		}

		&__active-block {
			display: flex;
			justify-content: center;
			font-weight: var(--fw-bold);
			align-items: center;
			width: 60px;
			height: 60px;
			background-color: rgb(0, 0, 0);
			position: absolute;
			left: 0;
			color: white;
			transform: translateX(0px);
			transition: transform 0.15s ease;
		}

		&__action.active {
			color: white;
		}

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 110%;
			border: 1px solid white;
			border-bottom: none;
			top: -5px;
			left: -5px;
		}
	}
	.hero {
		position: relative;
		// height: 80vh;
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
