<script lang="ts">
	import { browser } from '$app/env';
	import { beforeNavigate } from '$app/navigation';
	import Alert from '$lib/components/global/Alert.svelte';
	import Drawers from '$lib/components/cart/CartDrawer.svelte';
	import Footer from '$lib/components/global/Footer.svelte';
	import LoadingScreen from '$lib/components/global/LoadingScreen.svelte';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import { alertLocation, alerts } from '$lib/stores/alerts';
	import {
		navOverlay,
		overlay,
		navbarMinimzed as navMinimzedStore,
		loadingScreen
	} from '$lib/stores/interface';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let navbarMinimzed = false;
	let lastScrollY = 0;
	let sectionWrapper: HTMLElement;

	const drawers = {
		cart: false
	};

	/* TODO: Optimze Preformance Here */
	const handleMouseScroll = (event: MouseEvent) => {
		if (lastScrollY < window.scrollY) {
			navbarMinimzed = true;
			$navMinimzedStore = true;
		} else {
			navbarMinimzed = false;
			$navMinimzedStore = false;
		}

		lastScrollY = window.scrollY;
	};

	const setDrawerExapnded = (opened: boolean, type: keyof typeof drawers) => {
		sectionWrapper.style.transform = opened ? 'translateX(-430px)' : 'none';
		drawers[type] = opened;
	};

	onMount(() => {
		document.addEventListener('scroll', handleMouseScroll, { passive: true });

		return () => {
			document.removeEventListener('scroll', handleMouseScroll);
		};
	});

	beforeNavigate(() => {
		setDrawerExapnded(false, 'cart');
	});

	/* TIP: Hide scroll when overlay is open */
	$: if (browser && $overlay) {
		document.body.style.overflow = `${$overlay ? 'hidden' : 'auto'}`;
	}

	/* TIP: Open overlay when drawer opens */
	$: $overlay = drawers.cart;
</script>

{#if $overlay || $navOverlay}
	<div class="overlay" transition:fade={{ duration: 150 }} class:navbarShown={$navOverlay} />
{/if}

<!-- Main Section -->
<section bind:this={sectionWrapper}>
	<Navbar
		minimized={navbarMinimzed}
		on:clickHeart
		on:clickCart={() => setDrawerExapnded(true, 'cart')}
	/>
	<slot />
	<Footer />
</section>

<!-- Wishlist & Cart Drawers -->
{#if drawers.cart}
	<Drawers on:cartClosed={() => setDrawerExapnded(false, 'cart')} />
{/if}

<!-- Popup Alerts -->
{#if $alerts.length >= 1}
	<div class="alert-wrapper {$alertLocation.horizontal} {$alertLocation.vertical}">
		{#each $alerts as alert (alert.id)}
			<Alert type={alert.type} message={alert.message} />
		{/each}
	</div>
{/if}

<!-- Loading Screen -->
{#if $loadingScreen}
	<LoadingScreen />
{/if}

<style lang="scss">
	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.466);
		backdrop-filter: blur(3px);
		z-index: 200;
		top: 0;

		&.navbarShown {
			z-index: 10;
		}
	}

	section {
		height: 100%;
		width: 100%;
		padding-top: 106px;
		transition: transform 0.25s ease-out;
	}

	.alert-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: fixed;
		// bottom: 12px;
		// right: 12px;
		z-index: 200;

		&.top {
			top: 120px;
			// flex-direction: column-reverse;
		}

		&.bottom {
			bottom: 12px;
		}

		&.right {
			right: 12px;
		}

		&.left {
			left: 12px;
		}

		&.center {
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
