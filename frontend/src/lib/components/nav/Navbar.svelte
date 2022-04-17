<script lang="ts">
	import Topbar from './Topbar.svelte';
	import Icon from '@iconify/svelte';
	import { navbarLoading, navOverlay } from '$lib/stores/interface';
	import NavDropdown from './NavDropdown.svelte';
	import { fade } from 'svelte/transition';
	import DropdownGroup from './DropdownGroup.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { cartCount } from '$lib/stores/cart-store';
	import { beforeNavigate } from '$app/navigation';
	import { gsap, Power3 } from 'gsap';

	export let minimized: boolean = false;

	let iconSize = 25;
	let activeNavLink: typeof NAV_LINKS[number] = 'Brands';
	let dropdown = false;

	let hoverImages: string[] = [
		'/atsuko_shirts.jpg',
		'/products/add_black.jpg',
		'/products/gym_shark.jpg'
	];

	let activeHoverImageIndex = 0;

	const NAV_LINKS = ['shop', 'Brands', 'accessories'] as const;

	const dispatch = createEventDispatcher();

	function closeNavbar() {
		activeNavLink = null;
		dropdown = false;
		$navOverlay = false;
	}

	const linkWrapMouseLeave = (event: MouseEvent) => {
		// closeNavbar();
	};

	const linkMouseEnter = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const id = target.dataset.id as typeof NAV_LINKS[number];
		activeNavLink = id;

		if ($navOverlay && dropdown) return;
		$navOverlay = true;
		dropdown = true;
	};

	beforeNavigate(() => {
		closeNavbar();
	});

	type EnterDirection = 'left' | 'right' | 'bottom' | 'top';
	let stackingOrder = 0;

	function getMouseEnterDirection(event: MouseEvent): EnterDirection {
		const { offsetX, offsetY } = event;
		const target = event.target as HTMLElement;

		if (offsetY < 0) return 'top';
		if (offsetY >= target.clientHeight) return 'bottom';

		if (offsetX <= 0) return 'left';
		if (offsetX >= target.clientWidth - 10) return 'right';
	}

	function getAnimationTransform(direction: EnterDirection) {
		if (direction === 'top') return { height: 0, top: 0 };
		if (direction === 'bottom') return { height: 0, bottom: 0 };
		if (direction === 'left') return { width: 0, left: 0 };
		if (direction === 'right') return { width: 0, right: 0 };
	}

	function playTween(direction: EnterDirection, imageIndex: string) {
		gsap.set(`#dropdown__image--${imageIndex}`, {
			zIndex: ++stackingOrder,
			left: 'unset',
			right: 'unset',
			top: 'unset',
			bottom: 'unset'
		});

		gsap.fromTo(
			`#dropdown__image--${imageIndex}`,
			{ ...getAnimationTransform(direction) },
			{
				width: '100%',
				height: '100%',
				duration: 0.85,
				ease: Power3.easeInOut
			}
		);
	}

	function handleMouseEnter(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const imageIndex = target.dataset.index;
		if (parseInt(imageIndex) === activeHoverImageIndex) return;

		let enterDirection = getMouseEnterDirection(event);
		playTween(enterDirection, imageIndex);
		activeHoverImageIndex = parseInt(imageIndex);
	}
</script>

<div class="nav__wrapper" class:minimized>
	<Topbar />
	<nav class="nav">
		<a href="/" class="nav__logo-wrap">
			<img class="nav__logo" src="/images/logo.png" alt="Logo" />
		</a>

		<div class="nav__links" on:mouseleave={linkWrapMouseLeave}>
			{#each NAV_LINKS as link}
				<a
					href="/{link}"
					class="nav__links__wrap"
					class:active={link === activeNavLink}
					data-id={link}
					on:mouseenter={linkMouseEnter}
				>
					<span class="nav__links__item">
						{link}
						<div class="nav__links__underline" />
					</span>
				</a>
			{/each}

			{#if dropdown && activeNavLink}
				<div class="dropdown" transition:fade={{ duration: 50 }}>
					{#if activeNavLink == 'shop'}
						<NavDropdown>
							<DropdownGroup title="Trending">
								<a
									href="/collections/all-products"
									id="nav-link"
									data-index={0}
									on:mouseenter={handleMouseEnter}>All products</a
								>
								<a
									href="/collections/new-releases"
									id="nav-link"
									data-index={1}
									on:mouseenter={handleMouseEnter}>New Releases</a
								>
								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>Best Sellers</a
								>
							</DropdownGroup>

							<DropdownGroup title="Products">
								<a href="/collections/t-shirts">T-Shirts</a>
								<a href="/collections/hoodies">Hoodies</a>
							</DropdownGroup>

							<div class="dropdown__image-wrap">
								{#each hoverImages as image, i}
									<img
										id="dropdown__image--{i}"
										class="dropdown__image"
										src="/images/{image}"
										alt=""
									/>
								{/each}
							</div>
						</NavDropdown>
					{:else if activeNavLink == 'Brands'}
						<NavDropdown>
							<DropdownGroup title="Trending">
								<a
									href="/collections/all-products"
									id="nav-link"
									data-index={0}
									on:mouseenter={handleMouseEnter}>Attack On Titan</a
								>
								<a
									href="/collections/new-releases"
									id="nav-link"
									data-index={1}
									on:mouseenter={handleMouseEnter}>Bleach</a
								>
								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>Death Note</a
								>
								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>Demon Slayer</a
								>

								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>Dragon Ball Z</a
								>

								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>Hunter x Hunter</a
								>

								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>My Hero Academia</a
								>

								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>Naruto Shippuden</a
								>
								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>One Piece</a
								>
								<a
									href="/collections/best-sellers"
									id="nav-link"
									data-index={2}
									on:mouseenter={handleMouseEnter}>One Punch Man</a
								>

								<div class="dropdown__image-wrap">
									{#each hoverImages as image, i}
										<img
											id="dropdown__image--{i}"
											class="dropdown__image"
											src="/images/{image}"
											alt=""
										/>
									{/each}
								</div>
							</DropdownGroup>
						</NavDropdown>
					{:else if activeNavLink == 'accessories'}
						<NavDropdown>Coming Sooon...</NavDropdown>
					{/if}
				</div>
			{/if}
		</div>

		<div class="nav__actions">
			<a href="/">
				<Icon icon="carbon:search" width={iconSize} height={iconSize} />
			</a>
			<div class="nav__heart-action" on:click={() => dispatch('clickHeart')}>
				<Icon icon="ant-design:heart-outlined" width={iconSize} height={iconSize} />
			</div>
			<a href="/login">
				<Icon icon="clarity:avatar-line" width={iconSize} height={iconSize} />
			</a>
			<div class="nav__cart" on:click={() => dispatch('clickCart')}>
				<div class="nav__cart__total" class:large={$cartCount >= 100}>
					{$cartCount || 0}
				</div>
				<Icon icon="ant-design:shopping-outlined" width={iconSize} height={iconSize} />
			</div>
		</div>
	</nav>

	<div class="loader">
		{#if $navbarLoading}
			<div class="loader__progress" />
		{/if}
	</div>
</div>

<style lang="scss">
	.dropdown {
		position: absolute;
		width: 100%;
		bottom: -1px;
		transform: translateY(100%);

		&__image {
			height: 100%;
			width: 100%;
			object-fit: cover;
			position: absolute;
		}

		&__image-wrap {
			position: relative;
			width: 250px;
		}

		#nav-link {
			display: block;
		}

		a {
			transition: opacity 0.15s ease-out;
		}
		a:hover {
			opacity: 0.7;
		}
	}
	.nav__wrapper {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		transition: transform 0.25s linear, box-shadow 0.15s linear;
		transform: translateY(0);

		&.minimized {
			transform: translateY(-35px);
			box-shadow: 1px 0px 15px rgba(102, 102, 102, 0.281);
		}
	}
	.loader {
		position: absolute;
		bottom: -1px;
		width: 100%;
		height: 1px;
		background-color: var(--color-gray-s1);
		z-index: 100;
		pointer-events: none;

		&__progress {
			height: 100%;
			width: 100%;
			// background-color: var(--color-blue);
			background: rgb(0, 125, 181);
			background: linear-gradient(
				90deg,
				rgba(0, 125, 181, 0.5494572829131652) 0%,
				rgba(0, 125, 181, 0.9136029411764706) 50%,
				rgba(0, 125, 181, 0.5466561624649859) 100%
			);
			animation: load 1.9s linear infinite;
		}
	}
	@keyframes load {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(100%);
		}
	}
	.nav {
		position: relative;
		top: 0;
		width: 100%;
		background-color: white;
		display: grid;
		align-items: center;
		padding: 0 2rem;
		min-height: 70px;
		grid-template-columns: 1fr auto 1fr;
		// border-bottom: 1px solid var(--color-gray-s1);
		z-index: 100;

		&__logo {
			max-width: 100px;
		}

		&__logo-wrap {
			width: max-content;
		}

		&__actions {
			display: flex;
			justify-self: flex-end;
			gap: 1rem;
		}

		&__heart-action:hover {
			cursor: pointer;
		}
	}

	.nav__links {
		justify-content: center;
		display: flex;
		font-weight: var(--fw-semibold);

		&__wrap:hover {
			color: black;
		}

		&:hover &__wrap:not(.active) {
			opacity: 0.5;
		}

		&__item {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			height: 70px;
			font-size: 16px;
			text-transform: capitalize;
			font-weight: var(--fw-semibold);
		}

		&__wrap {
			padding: 0 1.5rem;
			transition: opacity 0.15s ease-out;
		}

		&__underline {
			background-color: black;
			position: absolute;
			display: block;
			width: 0px;
			bottom: -1px;
			height: 2px;
			transition: width 0.25s ease-out;
		}

		&__wrap.active &__underline {
			width: 100%;
		}
	}

	.nav__cart {
		position: relative;

		&__total {
			display: flex;
			justify-content: center;
			font-weight: var(--fw-semibold);
			align-items: center;
			position: absolute;
			min-width: 18px;
			min-height: 18px;
			bottom: -2px;
			right: -5px;
			font-size: 12px;
			background-color: var(--color-blue);
			border-radius: 50%;
			color: white;
		}

		&__total.large {
			min-width: 25px;
			min-height: 22px;
			bottom: -7px;
			right: -10px;
		}
	}
</style>
