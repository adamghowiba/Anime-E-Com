<script lang="ts">
</script>

<div class="cta">
	<h4><slot /></h4>
	<a href="/"> Read More  </a>
</div>

<style lang="scss">
	.cta {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 1rem;
		text-align: center;
		max-width: 70ch;
		height: 50vh;
		margin: 0 auto;

		h4 {
			line-height: 1.4;
            font-weight: var(--fw-semibold);
		}

		a {
			text-decoration: underline;
			text-transform: uppercase;
		}
	}
</style>
