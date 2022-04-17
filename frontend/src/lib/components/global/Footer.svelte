<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { FOOTER_BLOCKS } from '$lib/constant/footerLinks';

	let iconSize: number = 17;
	let openMobileSection: number;

	function handleMobileSectionClick(index: number) {
		if (openMobileSection === index) return (openMobileSection = null);

		openMobileSection = index;
	}

	onMount(() => {});
</script>

<footer class="footer">
	<div class="details">
		<h4>Anime Store</h4>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus unde eum nemo, quis ex
			omnis distinctio
		</p>
	</div>

	<div class="blocks">
		{#each FOOTER_BLOCKS as block, i}
			{@const isOpen = openMobileSection === i}

			<div class="blocks__item" class:open={isOpen} on:click={() => handleMobileSectionClick(i)}>
				<div class="blocks__title">
					<h5>{block.group}</h5>
					<i>
						<Icon icon={isOpen ? 'akar-icons:minus' : 'akar-icons:plus'} />
					</i>
				</div>

				<div class="blocks__links">
					{#each block.links as link}
						<a href={link.href}>{link.name} </a>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="bottom">
		<span class="bottom__legal">All Rights Reserved | Copyright © Web Revived</span>
		<span class="bottom__credits"
			>Designed by <a href="http://webrevived.com" target="_blank">Web Revived</a> | Custom Built With
			Svelte</span
		>
	</div>
</footer>

<style lang="scss">
	a,
	span,
	p {
		font-size: 13px;
		color: rgb(211, 208, 208);
	}
	.footer {
		background-color: black;
		color: white;
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'details blocks'
			'bottom bottom';
		justify-items: center;
		// justify-content: space-between;
		column-gap: 2rem;
		row-gap: 4rem;
		padding: 2.5rem;
		padding-top: 4rem;
		padding-bottom: 1rem;
		position: relative;

		h5,
		h4 {
			color: White;
		}

		h5 {
			font-size: 12px;
			text-transform: uppercase;
			font-weight: var(--fw-semibold);
		}

		h4 {
			font-size: 16px;
			margin-bottom: 10px;
			font-weight: var(--fw-semibold);
		}
	}

	.blocks {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		grid-area: blocks;

		&__item {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&__links {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			height: auto;
			transition: max-height 0.2s ease-out, opacity 0.15s linear;
		}

		i {
			display: none;
		}
	}

	.bottom {
		grid-area: bottom;
		width: 100%;
		display: flex;
		gap: 12px;
		display: flex;
		justify-content: space-between;

		a,
		span {
			font-size: 12px;
		}

		a {
			text-decoration: underline;
			color: var(--color-blue);
		}
	}

	.details {
		display: flex;
		flex-direction: column;
		margin-right: auto;
		// gap: 1rem;

		p {
			max-width: 35ch;
			line-height: 1.6;
			margin-bottom: 1rem;
		}

		&__contact-block {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		&__contact-item {
			display: flex;
			align-items: center;
			gap: 10px;
		}

		&__contact-icon {
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	/* Tablet */
	@media screen and (max-width: 768px) {
		.bottom {
			flex-direction: column;
		}
		.blocks {
			flex-direction: column;
			gap: 1rem;

			&__title {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			&__links {
				max-height: 0px;
				opacity: 0;
				overflow: hidden;
				padding: 1rem 0;
			}

			.open &__links {
				opacity: 1;
				max-height: 200px;
				height: auto;
			}

			i {
				display: block;
			}
		}

		.blocks__item {
			padding: 5px;
			gap: 0;

			&.open::after {
				content: '';
				width: 100%;
				height: 1px;
				background-color: rgba(58, 58, 58, 0.685);
			}
		}

		.footer {
			grid-template-columns: 1fr;
			// grid-template-rows: 1fr;
			grid-template-areas:
				'blocks'
				'details'
				'bottom';
			padding: 2rem 1.5rem;
			gap: 2rem;
		}
	}
</style>
