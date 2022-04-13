<script lang="ts">
	import { gsap, Power3, Power4, Power2,  Back, Circ } from 'gsap';
	import { onMount } from 'svelte';

	let loadingColors = ['#D0612A', '#6E2341', '#275084'];
	let loaderImages = [
		'loader_orange.png',
		'loader_purple.png',
		'loader_blue.png',
		'atsuko_people.jpg'
	];
	let loaderPhase = 0;

	function playImageLoader() {
		const images = document.querySelector('.loader__images').querySelectorAll('img');
		let timeline = gsap.timeline();

		images.forEach((image, i) => {
			timeline.from(image, {
				height: 0,
				duration: 0.85,
				ease: Power3.easeInOut
			}, i > 0 ? '>+=1' : ">");
			timeline.to(
				'.loader',
				{
					backgroundColor: loadingColors[loaderPhase++],
					duration: 0.2
				},
				'<+=20%'
			);
		});

		return timeline;
	}

	onMount(() => {
		const loaderImages = gsap.utils.toArray('#loader-image');

		// loaderImages.forEach((elem: HTMLElement) => {
		// 	gsap.set(elem, {
		// 		width: '50vw',
		//         x: '50%',
		// 	});
		// });

		let imageTimeline = playImageLoader();
		let placeBack = gsap.timeline();

		placeBack.from('.loader__images', {
			x: '50%',
            ease: Power2.easeIn
		});

		placeBack.from(
			'.loader__images',
			{
				width: '50vw',
                duration: 1.2,
                ease: Power3.easeInOut
			},
			'>'
		);

        placeBack.to(
			'.loader',
			{
				backgroundColor: 'transparent'
			},
			'<'
		);

		let globalTimeline = gsap.timeline();

		globalTimeline.add(imageTimeline);
		globalTimeline.add(placeBack);
	});
</script>

<section class="screen">
	<div class="loader">
	</div>

	<div class="hero-img">
		<div class="loader__images">
			{#each loaderImages as image}
				<img id="loader-image" src="/images/{image}" alt="" />
			{/each}
		</div>
	</div>
</section>

<section class="bottom-filler" />

<style lang="scss">
	.loader {
		position: absolute;
		background-color: wheat;
		width: 100%;
		height: 100vh;
		top: -105px;
		z-index: 2000;
		background-color: #d0612a;
	}
	.loader__images {
		width: 100%;
		height: 100%;
		object-fit: cover;

		img {
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: 50%;
		}
	}
	.screen {
		position: relative;
	}
	.hero-img {
		height: 80vh;
		width: 100%;
		position: relative;
		z-index: 5000;

		img {
			width: 100%;
			height: 100%;
			display: block;
			object-fit: cover;
		}
	}
	.bottom-filler {
		background-color: white;
		border: 1px solid red;
		height: 20vh;
	}
</style>
