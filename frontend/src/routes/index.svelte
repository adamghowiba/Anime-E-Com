<script>
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import FeaturedProducts from '$lib/components/product/FeaturedProducts.svelte';
	import CategoryTile from '$lib/components/product/CategoryTile.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	onMount(async () => {
		// const ScrollTrigger = await import('gsap/ScrollTrigger');
		// gsap.registerPlugin(ScrollTrigger.ScrollTrigger);

		// gsap.from(['body', 'nav', '.topbar'], {
		// 	backgroundColor: '#323232',
		// 	color: 'white',
			
		// 	scrollTrigger: {
		// 		trigger: 'body',
		// 		start: 'top+=300px',
		// 		end: 'top+=310px',
		// 		markers: true,
		// 		scrub: 1
		// 	}
		// });
	});
</script>

<Hero
	title="MINIMAL ANIME STYLE"
	subtitle="New styles, max comfort"
	button={{ link: '', text: 'shop' }}
	videoSrc="/videos/anime_video.mp4"
/>

<FeaturedProducts title="New releases" subtitle="mens" button={{ link: '/', name: 'View All' }}>
	<ProductCard
		imgSrc="/images/products/gym_shark.jpg"
		price={42}
		title="Anti-Magic Hoodie"
		features={['Mineral', 'paige pink']}
		sizes={['sm', 'md', 'lg', 'xl']}
		newItem
	/>
	<ProductCard
		imgSrc="/images/products/lone_wolf.jpg"
		price={42}
		title="All Alone Tee"
		features={['Mineral', 'paige pink']}
		sizes={['sm', 'md', 'lg', 'xl']}
		newItem
	/>
	<ProductCard
		imgSrc="/images/products/numa.jpg"
		price={42}
		title="Do You Jest Hoodie"
		features={['Mineral', 'paige pink']}
		sizes={['sm', 'md', 'lg', 'xl']}
		newItem
	/>
	<ProductCard
		imgSrc="/images/products/tokyo.jpg"
		price={42}
		title="Tokyo City Hoodie"
		features={['Mineral', 'paige pink']}
		sizes={['sm', 'md', 'lg', 'xl']}
		newItem
	/>
</FeaturedProducts>

<!-- Make a 2 col grid 1 strecthed tile -->
<div class="categories container--spaced">
	<div class="categories__large">
		<CategoryTile
			imgSrc="/images/demon_slayer.jpg"
			links={[{ href: '', name: 'Shop Now' }]}
			title="Attack On Titan"
			center
		/>
	</div>
	<CategoryTile
		imgSrc="/images/attack_titan.jpg"
		links={[{ href: '', name: 'Shop Now' }]}
		title="Demon Slayer"
	/>
	<CategoryTile
		imgSrc="/images/mossholder.jpg"
		links={[{ href: '', name: 'Shop Now' }]}
		title="Moss Holder"
	/>
</div>

<FeaturedProducts title="New releases" subtitle="mens" button={{ link: '/', name: 'View All' }}>
	<ProductCard
		imgSrc="/images/products/gym_shark.jpg"
		price={42}
		title="Anti-Magic Hoodie"
		features={['Mineral', 'paige pink']}
		newItem
	/>
	<ProductCard
		imgSrc="/images/products/lone_wolf.jpg"
		price={42}
		title="All Alone Tee"
		features={['Mineral', 'paige pink']}
		newItem
	/>
	<ProductCard
		imgSrc="/images/products/numa.jpg"
		price={42}
		title="Do You Jest Hoodie"
		features={['Mineral', 'paige pink']}
		newItem
	/>
	<ProductCard
		imgSrc="/images/products/tokyo.jpg"
		price={42}
		title="Tokyo City Hoodie"
		features={['Mineral', 'paige pink']}
		newItem
	/>
</FeaturedProducts>

<Hero
	title="MINIMAL ANIME STYLE"
	subtitle="New styles, max comfort"
	button={{ link: '', text: 'shop' }}
	imgSrc="/images/demon_slayer.jpg"
	contentAlign="btm-center"
	height={60}
/>

<Hero
	title="MINIMAL ANIME STYLE"
	subtitle="New styles, max comfort"
	button={{ link: '', text: 'shop' }}
	imgSrc="/images/attack_titan.jpg"
	contentAlign="btm-center"
	height={60}
/>

<!-- <div class="filler"></div> -->
<style lang="scss">
	.categories {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 10px;

		&__large {
			grid-row: 1/-1;
		}
	}
	.filler {
		margin-bottom: 10rem;
	}
</style>
