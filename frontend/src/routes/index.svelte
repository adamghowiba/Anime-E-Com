<script lang="ts">
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import FeaturedProducts from '$lib/components/product/FeaturedProducts.svelte';
	import CategoryTile from '$lib/components/home/CategoryTile.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import ContentCta from '$lib/components/home/ContentCTA.svelte';
</script>

<Hero
	title="Minimal anime clothing."
	subtitle="Original art, artist owened, worldwide shipping."
	images={[
		'dj_orange.jpg',
		'leet_green.jpg',
		'atsuko_shirts.jpg',
		'atsuko_people.jpg',
		'demon_slayer.jpg'
	]}
	button={{ link: '/collections/all-products', text: 'Shop All' }}
/>

<FeaturedProducts title="New releases" subtitle="Hoodies" button={{ link: '/collections/hoodies', name: 'View All' }}>
	<ProductCard
		thumbnail="/images/products/lone_wolf.jpg"
		price={42}
		title="All Alone Tee"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
	<ProductCard
		thumbnail="/images/products/numa.jpg"
		price={42}
		title="Do You Jest Hoodie"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
	<ProductCard
		thumbnail="/images/products/gon_zilla.jpg"
		price={42}
		title="Anti-Magic Hoodie"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
	<ProductCard
		thumbnail="/images/products/tokyo.jpg"
		price={42}
		title="Tokyo City Hoodie"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
</FeaturedProducts>

<!-- Make a 2 col grid 1 strecthed tile -->
<div class="categories container--spaced">
	<div class="categories__large">
		<CategoryTile
			imgSrc="/images/demon_slayer.jpg"
			links={[{ href: 'collections/attack-on-titan', name: 'Shop Now' }]}
			title="Attack On Titan"
			center
		/>
	</div>
	<CategoryTile
		imgSrc="/images/attack_titan.jpg"
		links={[{ href: 'collections/attack-on-titan', name: 'Shop Now' }]}
		title="Demon Slayer"
	/>
	<CategoryTile
		imgSrc="/images/mossholder.jpg"
		links={[{ href: 'collections/attack-on-titan', name: 'Shop Now' }]}
		title="Moss Holder"
	/>
</div>

<FeaturedProducts title="BEST OF ANIME" button={{ link: '/', name: 'View All' }}>
	<ProductCard
		thumbnail="/images/products/lone_wolf.jpg"
		price={42}
		title="Anti-Magic Hoodie"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
	<ProductCard
		thumbnail="/images/products/gon_zilla.jpg"
		price={42}
		title="All Alone Tee"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
	<ProductCard
		thumbnail="/images/products/numa.jpg"
		price={42}
		title="Do You Jest Hoodie"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
	<ProductCard
		thumbnail="/images/products/tokyo.jpg"
		price={42}
		title="Tokyo City Hoodie"
		features={['Mineral', 'paige pink']}
		permaLink=""
		newItem
	/>
</FeaturedProducts>

<section class="hero-section">
	<Hero
		title="MINIMAL ANIME STYLE"
		subtitle="New styles, max comfort"
		button={{ link: '', text: 'shop' }}
		imgSrc="demon_slayer.jpg"
		contentAlign="btm-center"
		height={60}
	/>
</section>

<ContentCta>
	OUR PIECES ARE DESIGNED TO CONTOUR AND ENHANCE EVERY CURVE ON EVERY SIZE AND SHAPE OF WOMAN WHILST
	BEING STYLISH AND COMFORTABLE
</ContentCta>

<section class="hero-section">
	<Hero
		title="MINIMAL ANIME STYLE"
		subtitle="New styles, max comfort"
		button={{ link: '', text: 'shop' }}
		imgSrc="attack_titan.jpg"
		contentAlign="btm-center"
		height={60}
	/>
</section>

<!-- <div class="filler"></div> -->
<style lang="scss">
	.categories {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 40vh 40vh;
		gap: 10px;
		padding: 0;
		// overflow-y: hidden;

		&__large {
			grid-row: 1/-1;
			height: 100%;
		}
	}
	.hero-section {
		// margin-top: 4rem;
	}
</style>
