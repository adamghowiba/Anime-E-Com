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

		<div class="details__contact-block">
			<div class="details__contact-item">
				<div class="details__contact-icon">
					<Icon icon="eva:pin-fill" color="white" width={iconSize} height={iconSize} />
				</div>
				<span>44 Elmessaha Street Dokki, Giza</span>
			</div>
			<div class="details__contact-item">
				<div class="details__contact-icon">
					<Icon icon="carbon:phone-filled" color="white" width={iconSize} height={iconSize} />
				</div>
				<span>(202) 37 497 155</span>
			</div>
			<div class="details__contact-item">
				<div class="details__contact-icon">
					<Icon icon="ic:baseline-email" color="white" width={iconSize} height={iconSize} />
				</div>
				<span>ahmad@fayroozfarm.com</span>
			</div>
		</div>
	</div>

	<div class="footer__block">
		<h5>Shopping Services</h5>
		<a href="/">Schedule Consultation</a>
		<a href="/">Showrooms</a>
		<a href="/">Trade Program</a>
		<a href="/">Outlet</a>
	</div>
	<div class="footer__block">
		<h5>About</h5>
		<a href="/">Our Story</a>
		<a href="/">Reviews</a>
		<a href="/">Carrers</a>
		<a href="/">Our blog</a>
	</div>
	<div class="footer__block">
		<h5>Resources</h5>
		<a href="/">Look Up Order Status</a>
		<a href="/">Returns</a>
		<a href="/">Shipping & Delivery</a>
		<a href="/">FAQ</a>
	</div>

	<div class="bottom">
		<div class="bottom__divider" />
		<div class="bottom__content">
			<span class="bottom__legal">All Rights Reserved | Copyright © Al Fayrooz</span>
			<span class="bottom__credits"
				>Designed by <a href="http://webrevived.com" target="_blank">Web Revived</a> | Custom Built With Svelte</span
			>
		</div>
	</div>
</footer>

<style lang="scss">
	.footer {
		display: grid;
        border-top: 1px solid #E7E7E7;
		grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'details block block block'
			'bottom bottom bottom bottom';
		justify-items: center;
		// justify-content: space-between;
		column-gap: 1rem;
		row-gap: 2rem;
		padding: 2.5rem;
		padding-bottom: 1rem;

		&__block {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}

		&__block h5 {
			font-weight: var(--fw-medium);
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
			background-color: #E7E7E7;
		}

		&__content {
			display: flex;
			justify-content: space-between;
			font-size: var(--text-sm);
		}

		a {
			text-decoration: underline;
			color: var(--color-blue);
		}
	}

	.details {
		display: flex;
		flex-direction: column;
		// gap: 1rem;

		h4 {
			margin-bottom: 4px;
		}

		p {
			max-width: 40ch;
			line-height: 1.4;
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
			width:  35px;
			height: 35px;
			background-color: rgb(43, 43, 43);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
