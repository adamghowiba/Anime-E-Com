<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import SquareButton from '../global/SquareButton.svelte';

	let helpDropdownExpanded: boolean = false;
	let iconSize = 20;
</script>

<nav class="sidebar">
	<a class="sidebar__link" href="/account">
		<Icon icon="ant-design:home-outlined" width={iconSize} height={iconSize} />
		My Account
	</a>

	<a class="sidebar__link" href="/account/profile">
		<Icon icon="ant-design:home-outlined" width={iconSize} height={iconSize} />
		My Profile
	</a>

	<a class="sidebar__link" href="/account/orders">
		<Icon icon="ant-design:home-outlined" width={iconSize} height={iconSize} />
		Orders
	</a>

	<a class="sidebar__link" href="/account/wishlist">
		<Icon icon="ant-design:home-outlined" width={iconSize} height={iconSize} />
		Wishlist
	</a>

	<a class="sidebar__link" href="/">
		<Icon icon="ant-design:home-outlined" width={iconSize} height={iconSize} />
		Logout
	</a>

	<hr />

	<div class="help">
		<SquareButton
			buttonColor="black"
			hover={false}
			icon="akar-icons:plus"
			size="small"
			on:click={() => (helpDropdownExpanded = !helpDropdownExpanded)}>Help & Contact</SquareButton
		>

		{#if helpDropdownExpanded}
			<hr class="help__divider" />

			<div class="help__dropdown" transition:slide={{ duration: 250 }}>
				<div class="help__contact-block">
					<h6>By email</h6>
					<a href="/" class="help__link">support@animae.com</a>
				</div>

				<div class="help__contact-block">
					<h6>By phone</h6>
					<a href="/" class="help__link">407-924-6902</a>
				</div>

				<span>(Monday - Friday, 9am - 9pm EST)</span>
			</div>
		{/if}
	</div>
	<!-- <button class="sidebar__help">Help & Contact</button> -->
</nav>

<style lang="scss">
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		color: black;

		&__link {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 20px;
			font-weight: var(--fw-semibold);
			// font-size: var(--text-base);
			// text-transform: uppercase;
		}

		hr {
			width: 100%;
			border: none;
			border-top: 1px solid var(--color-gray-s2);
		}
	}

	.help {
		h6 {
			color: white;
			font-weight: var(--fw-semibold);
		}

		&__dropdown {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			background-color: black;
			color: white;
			padding: 20px 25px 20px 25px;
		}

		hr {
			margin: 0;
			border: none;
			border-top: 1px solid gray;
		}

		&__contact-block {
			display: flex;
			flex-direction: column;
			gap: 9px;
		}

		&__dropdown span {
			font-size: 11px;
		}

		a {
			font-size: 12px;
			text-decoration: underline;
		}
	}
</style>
