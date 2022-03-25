<script lang="ts">
	import Alert from '$lib/components/global/Alert.svelte';
	import Footer from '$lib/components/global/Footer.svelte';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import { alertLocation, alerts } from '$lib/stores/alerts';
	import { overlay } from '$lib/stores/interface';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let navbarMinimzed = false;
	let lastScrollY = 0;

	/* TODO: Optimze Preformance Here */
	const handleMouseScroll = (event: MouseEvent) => {
		if (lastScrollY < window.scrollY) {
			navbarMinimzed = true;
		} else {
			navbarMinimzed = false;
		}

		lastScrollY = window.scrollY;
	};

	onMount(() => {
		document.addEventListener('scroll', handleMouseScroll, { passive: true });

		return () => {
			document.removeEventListener('scroll', handleMouseScroll);
		};
	});
</script>

{#if $overlay}
	<div class="overlay" transition:fade={{ duration: 150 }} />
{/if}

<section>
	<Navbar minimized={navbarMinimzed} />
	<slot />
	<Footer />
</section>

{#if $alerts.length >= 1}
	<div class="alert-wrapper {$alertLocation.horizontal} {$alertLocation.vertical}">
		{#each $alerts as alert (alert.id)}
			<Alert type={alert.type} message={alert.message} />
		{/each}
	</div>
{/if}

<style lang="scss">
	.alert-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: fixed;
		// bottom: 12px;
		// right: 12px;
		z-index: 200;

		&.top {
			top: 12px;
			flex-direction: column-reverse;
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

	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.466);
		backdrop-filter: blur(3px);
		z-index: 100;
	}

	section {
		height: 100%;
		width: 100%;
		margin-top: 105px;
	}
</style>
