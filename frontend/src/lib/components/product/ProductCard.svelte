<script lang="ts">
	import { alerts } from '$lib/stores/alerts';
	import { savedItems } from '$lib/stores/wishlist';
	import { slugify } from '$lib/utils/stringUtils';
	import QuickviewPopup from '../popup/QuickviewPopup.svelte';
	import HeartAction from './HeartAction.svelte';

	export let thumbnail: string = '/images/no_image.png';
	export let price: number;
	export let title: string;
	export let productId: string = 'unset';
	export let features: string[] = [];
	export let newItem: boolean = false;
	export let saved: boolean = false;
	export let permaLink: string;

	let quickviewPopup = false;
	const addSavedProduct = () => {
		if (!saved) {
			savedItems.addItem({ price, thumbnail, title, productId });
			alerts.addAlert('Added item to wishlist', 'success');
			saved = true;
			return;
		}

		savedItems.removeItem(productId);
		alerts.addAlert('Removed item from wishlist', 'success');
	};
</script>

{#if quickviewPopup}
	<QuickviewPopup
		{features}
		{price}
		{title}
		{thumbnail}
		on:clickOutside={() => (quickviewPopup = false)}
	/>
{/if}

<div class="card">
	<HeartAction on:click={() => addSavedProduct()} {saved} />
	<a href="/product/{permaLink}" class="card__image-wrap">
		<img class="card__image" src={thumbnail || '/images/no_image.png'} alt="" />

		<!-- <div class="actions">
			<div class="actions__button">Save</div>
			<div class="actions__button" on:click={() => (quickviewPopup = true)}>Quickview</div>
		</div> -->
	</a>

	<div class="details">
		<p class="details__title">
			{title}
		</p>

		<div class="details__header">
			{#if newItem}
				<div class="details__badge">
					<span>NEW</span>
				</div>
			{/if}
			<span>${price}</span>
		</div>

		{#if features.length >= 1}
			<div class="details__features">
				<span>{features.join(' | ')}</span>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 8px;

		&:hover .quickadd {
			opacity: 1;
		}

		&__heart {
			position: absolute;
			top: 12px;
			right: 12px;
		}

		&__image-wrap {
			position: relative;
			display: block;
			height: 100%;
			max-width: 400px;
			object-fit: cover;
		}

		&__image {
			display: block;
			height: 100%;
			width: 100%;
			object-fit: cover;
			object-position: 50%;
		}

		&__divider {
			height: 100%;
			width: 1px;
			background-color: gray;
		}
	}

	.actions {
		display: flex;
		gap: 1rem;
		position: absolute;
		bottom: 5px;
		width: 100%;
		padding: 0 5px;

		&__button {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 9px;
			font-size: 13px;
			background-color: hsla(60, 25%, 98%, 0.8);
			// background-color: rgba(255, 179, 93, 0.445);
			font-weight: var(--fw-semibold);
			backdrop-filter: blur(20px);
		}
	}
	.details {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-height: 50px;
		flex-shrink: 0;

		span {
			font-size: 14px;
		}

		&__header {
			display: flex;
			justify-content: space-between;
			font-weight: var(--fw-semibold);
			align-items: center;
		}

		&__title {
			color: #444444;
			max-width: 75%;
		}

		&__badge {
			padding: 5px 0;
			padding-left: 5px;
			font-weight: var(--fw-bold);
			font-size: 11px;
			text-transform: uppercase;
			border-left: 3px solid black;
		}

		&__features {
			display: flex;
			gap: 10px;
			font-size: 14px;
			color: #6e6e6e;
			text-transform: capitalize;
		}
	}
</style>
