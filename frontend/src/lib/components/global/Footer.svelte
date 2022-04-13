<script lang="ts">
	import Icon from '@iconify/svelte';

	let iconSize: number = 17;
</script>

<footer class="footer">
	<div class="details">
		<h4>Anime Store</h4>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus unde eum nemo, quis ex
			omnis distinctio
		</p>

		<!-- <div class="details__contact-block">
			<div class="details__contact-item">
				<div class="details__contact-icon">
					<Icon icon="eva:pin-fill" color="black" width={iconSize} height={iconSize} />
				</div>
				<span>44 Elmessaha Street Dokki, Giza</span>
			</div>
			<div class="details__contact-item">
				<div class="details__contact-icon">
					<Icon icon="carbon:phone-filled" color="black" width={iconSize} height={iconSize} />
				</div>
				<span>(202) 37 497 155</span>
			</div>
			<div class="details__contact-item">
				<div class="details__contact-icon">
					<Icon icon="ic:baseline-email" color="black" width={iconSize} height={iconSize} />
				</div>
				<span>ahmad@fayroozfarm.com</span>
			</div>
		</div> -->
	</div>

	<div class="blocks">
		<div class="blocks__item">
			<h5>Shopping Services</h5>
			<a href="/">Schedule Consultation</a>
			<a href="/">Showrooms</a>
			<a href="/">Trade Program</a>
			<a href="/">Outlet</a>
		</div>
		<div class="blocks__item">
			<h5>About</h5>
			<a href="/">Our Story</a>
			<a href="/">Reviews</a>
			<a href="/">Carrers</a>
			<a href="/">Our blog</a>
		</div>
		<div class="blocks__item">
			<h5>Resources</h5>
			<a href="/">Look Up Order Status</a>
			<a href="/">Returns</a>
			<a href="/">Shipping & Delivery</a>
			<a href="/">FAQ</a>
		</div>
	</div>

	<div class="bottom">
		<!-- <div class="bottom__divider" /> -->
		<div class="bottom__content">
			<span class="bottom__legal">All Rights Reserved | Copyright © Web Revived</span>
			<span class="bottom__credits"
				>Designed by <a href="http://webrevived.com" target="_blank">Web Revived</a> | Custom Built With
				Svelte</span
			>
		</div>
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
		border-top: 1px solid #e7e7e7;
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
	}

	.bottom {
		grid-area: bottom;
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;

		&__divider {
			width: 100%;
			height: 1px;
			background-color: #e7e7e7;
		}

		&__content {
			display: flex;
			justify-content: space-between;
		}

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
</style>
