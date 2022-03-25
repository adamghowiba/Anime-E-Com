<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let button: { link: string; name: string };
</script>

<section class="new-release container container--spaced">
	<header>
		<div class="new-release__title">
			<h5>{subtitle}</h5>
			<h3>{title}</h3>
		</div>

		<a href={button.link}>{button.name}</a>
	</header>

	<div class="new-release__products">
		<slot />
	</div>
</section>

<style lang="scss">
	.new-release {
		display: flex;
		gap: 2rem;
		display: flex;
		flex-direction: column;

		header {
			justify-content: space-between;
			align-items: center;
			display: flex;

			a {
				text-decoration: underline;
				font-weight: var(--fw-semibold);
			}
		}

		&__title {
			text-transform: uppercase;
		}

		&__title h5 {
			font-weight: var(--fw-semibold);
		}
		&__title h3 {
			font-weight: var(--fw-bold);
		}

		&__products {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 1fr;
			gap: 1.5rem;
		}
	}

	@media screen and (max-width: 1024px) {
		.new-release {
			&__products {
				grid-template-columns: repeat(3, 1fr);
			}

			:global(.card:nth-child(4)) {
				display: none;
			}
		}
	}

	@media screen and (max-width: 768px) {
		.new-release {
			&__products {
				grid-template-columns: repeat(2, 1fr);
			}

			:global(.card:nth-child(4)),
			:global(.card:nth-child(3)) {
				display: none;
			}
		}
	}
</style>
