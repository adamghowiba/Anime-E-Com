<script lang="ts">
	import Topbar from './Topbar.svelte';
	import Icon from '@iconify/svelte';
	import { overlay } from '$lib/stores/interface';
	import NavDropdown from './NavDropdown.svelte';
	import { fade } from 'svelte/transition';
	import DropdownGroup from './DropdownGroup.svelte';

	export let minimized: boolean = false;

	const NAV_LINKS = ['shop', 'series', 'accessories'] as const;

	let iconSize = 25;
	let cartItems = 4;

	let activeNavLink: typeof NAV_LINKS[number];
	let dropdown = false;

	const linkWrapMouseEnter = (event: MouseEvent) => {};

	const linkWrapMouseLeave = (event: MouseEvent) => {
		activeNavLink = null;
		dropdown = false;
		$overlay = false;
	};

	const linkMouseEnter = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const id = target.dataset.id as typeof NAV_LINKS[number];
		activeNavLink = id;

		if ($overlay && dropdown) return;
		$overlay = true;
		dropdown = true;
	};
</script>

<div class="nav__wrapper" class:minimized>
	<Topbar />
	<nav class="nav">
		<a href="/">
			<img class="nav__logo" src="/images/logo.png" alt="Logo" />
		</a>

		<div class="nav__links" on:mouseenter={linkWrapMouseEnter} on:mouseleave={linkWrapMouseLeave}>
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
				<div class="nav__dropdown" transition:fade={{ duration: 50 }}>
					{#if activeNavLink == 'shop'}
						<NavDropdown>
							<DropdownGroup title="Trending">
								<a href="/">New Releases</a>
								<a href="/">Best Sellers</a>
								<a href="/">All products</a>
								<a href="/">Joggers</a>
								<a href="/">Leggings</a>
								<a href="/">Crop Tops</a>
							</DropdownGroup>

							<DropdownGroup title="Activity">
								<a href="/">Functional FItnesse</a>
								<a href="/">Lifting</a>
								<a href="/">Rest day</a>
								<a href="/">Running</a>
							</DropdownGroup>

							<DropdownGroup title="Collections">
								<a href="/">Flex</a>
								<a href="/">Adapt</a>
								<a href="/">Energy</a>
								<a href="/">Essentials</a>
								<a href="/">Seamless</a>
								<a href="/">Vital</a>
							</DropdownGroup>
						</NavDropdown>
					{:else if activeNavLink == 'series'}
						<NavDropdown>Series Items</NavDropdown>
					{:else if activeNavLink == 'accessories'}
						<NavDropdown>Accessoreis Items</NavDropdown>
					{/if}
				</div>
			{/if}
		</div>

		<div class="nav__actions">
			<a href="/">
				<Icon icon="carbon:search" width={iconSize} height={iconSize} />
			</a>
			<a href="/">
				<Icon icon="ant-design:heart-outlined" width={iconSize} height={iconSize} />
			</a>
			<a href="/login">
				<Icon icon="clarity:avatar-line" width={iconSize} height={iconSize} />
			</a>
			<div class="nav__cart">
				<div class="nav__cart__total" class:large={cartItems >= 100}>{cartItems}</div>
				<Icon icon="ant-design:shopping-outlined" width={iconSize} height={iconSize} />
			</div>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav__wrapper {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		transition: transform 0.25s linear;
		transform: translateY(0);

		&.minimized {
			transform: translateY(-35px);
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
		border-bottom: 1px solid var(--color-gray-s1);
		z-index: 100;

		&__logo {
			max-width: 100px;
		}

		&__actions {
			display: flex;
			justify-self: flex-end;
			gap: 1rem;
		}

		&__dropdown {
			position: absolute;
			width: 100%;
			bottom: -1px;
			transform: translateY(100%);
		}
	}

	.nav__links {
		justify-content: center;
		display: flex;
		font-weight: var(--fw-semibold);

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
