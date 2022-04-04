<script lang="ts">
	import { commerce } from '$lib/commerce/commerce';
	import SquareButton from '$lib/components/global/SquareButton.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import CheckoutItem from '$lib/components/product/CheckoutItem.svelte';
	import { cartItems } from '$lib/stores/cart';
	import { navbarMinimzed } from '$lib/stores/interface';
	import type { LineItem } from '@chec/commerce.js/types/line-item';

	let cartContents: LineItem[];

	let promoValue: string;

	async function addTestProduct() {
		const product = await commerce.products.retrieve('prod_gnZO5kXp0Wl7MN');
		const added = await commerce.cart.add('prod_gnZO5kXp0Wl7MN', 1, {
			vgrp_QG375vBax5rMOg: 'optn_yA6nldmbgLwEWb'
		});

		console.log(product, added);
	}

	async function getCartContents() {
		const cart = await commerce.cart.contents();

		cartContents = cart;
	}
	getCartContents();
</script>

<section class="cart container container--lg">
	{#if cartContents}
		<header>
			<h2>YOUR BAG</h2>

			<h5>TOTAL ({cartContents.length} item{cartContents.length > 1 ? 's' : ''})</h5>
			<a href="/">Continue Shopping</a>
		</header>

		<div class="cart__grid">
			<div class="cart__items">
				{#each cartContents as item}
					<CheckoutItem
						thumbnail={item.image.url}
						price={item.price.raw}
						quantity={item.quantity}
						title={item.name}
						id={item.id}
						variants={item.variant.options}
						productId={item.product_id}
						imgSize="215px"
					/>
				{/each}

				<hr style="width: 100%;" />

				{#each $cartItems as item}
					<CheckoutItem
						thumbnail={item.thumbnail}
						price={item.price}
						quantity={item.quanity}
						title={item.title}
						id={item.id}
						selectedVariant={item.selectedVariant}
						productId={item.productId}
						imgSize="215px"
					/>
				{/each}
			</div>

			<div class="order" class:isNavExpanded={!$navbarMinimzed}>
				<div class="order__block order__block--promo">
					<TextInput label="Enter Promo Code" name="" bind:value={promoValue} size="large" />
					<SquareButton buttonColor="black" justify="space-between" width="100%" outlined>
						Submit
					</SquareButton>
				</div>

				<div class="order__block order__block--total">
					<div class="order__summary">
						<h4>ORDER Summary</h4>
						<h6>TOTAL <span>$2,420.00</span></h6>
					</div>
					<SquareButton buttonColor="black" justify="space-between" width="100%" outlined>
						Check out
					</SquareButton>
				</div>
			</div>
		</div>
	{:else}
		<h4>Loading...</h4>
	{/if}
</section>

<style lang="scss">
	.order {
		top: 5.5rem;
		height: max-content;
		position: sticky;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		transition: top 0.25s ease-out;

		&.isNavExpanded {
			top: calc(5.5rem + 35px);
		}

		&__block {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__summary {
			border: 1px solid var(--color-gray-s2);
			display: flex;
			flex-direction: column;
			gap: 1.9rem;
			padding: 20px;
			font-weight: var(--fw-medium);
			text-transform: uppercase;

			h4 {
				font-weight: var(--fw-semibold);
			}

			h6 {
				font-size: var(--text-base);
				display: flex;
				width: 100%;
				justify-content: space-between;
			}
		}
	}
	.cart {
		display: grid;
		flex-direction: column;
		gap: 1.5rem;

		&__items {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}

		&__grid {
			display: grid;
			grid-template-columns: 1fr 0.5fr;
			gap: 2rem;
		}
	}
	header {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			font-weight: var(--fw-bold);
			margin-bottom: 0.8rem;
		}
		h5 {
		}
		a {
			font-size: var(--text-xsm);
			text-transform: uppercase;
			text-decoration: underline;
		}
	}
</style>
