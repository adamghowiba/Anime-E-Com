<script lang="ts">
	import Icon from '@iconify/svelte';

	export let images: string[] = [
		'add_front.jpg',
		'add_product.jpg',
		'add_side.jpg',
		'add-side_right.jpg'
	];

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
</script>

<div class="slider">
	<img src={images[sliderIndex]} alt="" />

	<div class="slider__action slider__action-next" on:click={nextSlide}>
		<Icon icon="ic:round-navigate-next" width={30} height={30} />
	</div>
	<div class="slider__action slider__action-prev" on:click={prevSlide}>
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
	.controls {
		position: absolute;
		display: flex;
		gap: 10px;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);

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
	.slider {
		position: relative;
		max-height: 700px;
		// height: 1200px;

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
		}

		&__action-next {
			right: 1rem;
		}

		&__action-prev {
			left: 1rem;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
