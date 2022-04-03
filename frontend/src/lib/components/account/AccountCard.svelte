<script lang="ts">
	import Icon from '@iconify/svelte';
	import { text } from 'svelte/internal';

	export let title: string;
	export let headerButton: { text: string; href: string } = null;
</script>

<div class="card">
	<div class="card__header">
		<h5>{title}</h5>

		{#if headerButton}
			<a class="card__header__button" href={headerButton.href}>{headerButton.text}</a>
		{/if}
	</div>
	<hr />

	<div class="card__items">
		<slot />
	</div>
</div>

<style lang="scss">
	.card {
		width: 100%;
		border: 1px solid var(--color-gray-s2);
		text-transform: capitalize;
		min-height: 260px;
		padding: 1.5rem;
		max-height: 400px;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem;
		}

		&__header__button {
			text-decoration: underline;
			color: black;
		}

		&__items {
			height: 100%;
			overflow-y: auto;
			padding: 12px 0;
		}

		h5 {
			font-weight: var(--fw-semibold);
		}

		hr {
			border: none;
			border-top: 1px solid var(--color-gray-s2);
		}
	}
</style>
