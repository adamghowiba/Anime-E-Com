<script lang="ts">
	import Icon from '@iconify/svelte';

	export let images: string[];
	let sliderIndex = 0;

	function setActiveSlide(index: number) {
		sliderIndex = index;
	}

	function nextSlide() {
		if (sliderIndex >= images.length - 1) return setActiveSlide(0);
		setActiveSlide(++sliderIndex);
	}

	function prevSlide() {
		if (sliderIndex == 0) return setActiveSlide(images.length - 1);
		setActiveSlide(--sliderIndex);
	}

	$: if (images) {
		sliderIndex = 0;
	}

	/* TODO: Handle case where slider image hasn't loaded on:load */
</script>

<div class="slider">
	<div class="slider__images">
		{#each images as imageSrc, i}
			<img
				loading={i === 0 ? 'eager' : 'lazy'}
				src={imageSrc}
				alt=""
				style:z-index={sliderIndex === i ? '10' : '0'}
			/>
		{/each}
	</div>

	<div
		class="slider__action slider__action--next"
		class:disabled={images.length === 0}
		on:click={nextSlide}
	>
		<Icon icon="ic:round-navigate-next" width={30} height={30} />
	</div>

	<div
		class="slider__action slider__action--prev"
		class:disabled={images.length === 0}
		on:click={prevSlide}
	>
		<Icon icon="ic:round-navigate-next" width={30} height={30} rotate="180deg" />
	</div>

	<div class="controls">
		{#each images as image, i}
			<div class="controls__option-wrap" on:click={() => setActiveSlide(i)}>
				<div class="controls__option" class:active={sliderIndex === i} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.slider {
		position: relative;
		max-height: 780px;
		// height: 1200px;

		&__images {
			height: 780px;
		}

		&__action {
			width: 50px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			border: 1px solid black;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			z-index: 10;
		}

		&__action--next {
			right: 1rem;
		}

		&__action--prev {
			left: 1rem;
		}

		.disabled {
			opacity: 0.2;
		}

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: contain;
			background-color: white;
		}
	}
	.controls {
		position: absolute;
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		gap: 10px;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		padding: 0 1rem;

		&__option-wrap {
			height: 25px;
			width: 25px;
			position: relative;
			// border: 1px solid red;
		}

		&__option {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 1px;
			background-color: black;
			transition: height 0.15s ease-out;
		}

		&__option-wrap:hover {
			cursor: pointer;
		}

		&__option.active {
			height: 8px;
		}
	}

	/* Laptop */
	@media screen and (max-width: 1024px) {
		.slider {
			&__images {
				height: 300px;
			}

			&__action {
				width: 35px;
				height: 35px;
				border-width: 1px;
			}
		}
	}

	/* Tablet */
	@media screen and (max-width: 768px) {
		.slider {
			&__images {
				min-height: 400px;
				height: auto;
			}
		}
	}

	/* Tablet */
	@media screen and (max-width: 425px) {
		.slider__images {
			height: auto;
		}
	}
</style>
