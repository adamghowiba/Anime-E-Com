<script lang="ts">
	import { overlay } from '$lib/stores/interface';
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from '../buttons/Button.svelte';
	import { clickOutside } from '$lib/utils/clickOutside';

	export let title: string;
	export let features: string[] = [];
	export let price: number;
	export let thumbnail: string;

	const dispatch = createEventDispatcher();

	onMount(() => {
		$overlay = true;

		return () => {
			$overlay = false;
		};
	});
</script>

<div
	class="quickview"
	use:clickOutside={() => {
		dispatch('clickOutside');
	}}
>
	<div class="quickview__images">
		<img src="/images/products/gym_shark.jpg" alt="" />
		<img src="/images/products/gym_shark.jpg" alt="" />
		<img src="/images/products/gym_shark.jpg" alt="" />
		<img src="/images/products/gym_shark.jpg" alt="" />
		<img src="/images/products/gym_shark.jpg" alt="" />
	</div>

	<div class="quickview__thumbnail">
		<img src={thumbnail} alt="" />
	</div>

	<div class="info">
		<div class="info__content">
			{#if features.length >= 1}
				<span class="info__features">{features.join(' | ')}</span>
			{/if}
			<h4 class="info__title">{title}</h4>
			<h5>${price}</h5>
		</div>
		<!-- <p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic quo iure error quasi, quaerat
			aut non voluptas molestiae similique facere perspiciatis nam, dolorem fugiat beatae accusamus
			debitis provident aspernatur incidunt pariatur cumque voluptates magni. Sunt et similique
			dignissimos esse repudiandae obcaecati facere, eius nihil, saepe voluptatibus officia debitis
			rem doloremque officiis quae cupiditate adipisci! Culpa expedita omnis cupiditate labore, eius
			aperiam quasi iusto voluptates. Magnam impedit autem dolorem sunt voluptatum harum earum
			temporibus natus dolorum alias quisquam corrupti quis culpa iure voluptas ipsum delectus,
			reprehenderit quidem explicabo. Aliquid ab inventore, porro cupiditate ex consectetur libero
			enim laudantium saepe, incidunt magni!
		</p> -->
		<hr />

		<div class="info__add">
			<span>qty 1</span>
			<Button buttonColor="black">Add To Bag</Button>
		</div>
	</div>
</div>

<style lang="scss">
		.quickview {
		position: fixed;
		display: grid;
		grid-template-columns: auto 1fr 1fr;
		width: 75%;
		background-color: white;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 200;
		border-radius: 6px;
		height: 600px;
		// gap: 12px;

		&__images {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			width: 80px;
			padding: 12px;
			// padding-right: 0;
			// border: 1px solid red;
			overflow-y: auto;
		}

		&__images img {
			width: 100%;
			max-height: 75px;
			object-fit: cover;
		}

		&__thumbnail {
			position: relative;
			height: 100%;

			// border: 1px solid black;
		}

		&__thumbnail img {
			left: 0;
			right: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		img {
			display: block;
		}
	}
	.info {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1.3rem;
		padding-bottom: 0;
		overflow-y: auto;

		&__features {
			font-size: 11px;
			text-transform: capitalize;
		}

		&__title {
			text-transform: capitalize;
			font-weight: var(--fw-semibold);
			line-height: 1.2;
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&__add {
			position: sticky;
			left: 0;
			right: 0;
			top: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fcfcfa;
			padding: 1rem 0;
			box-shadow: rgba(185, 185, 185, 0.24) 0px -4px 10px -2px;
		}

		hr {
			width: 100%;
			margin: 2rem 0;
			border: none;
			border: 1px solid var(--color-gray-s1);
		}
	}

</style>
