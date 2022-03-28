<script lang="ts">
	export let subtitle: string;
	export let title: string;
</script>

<header class="header">
	<div class="container container--lg">
		<h5>{subtitle}</h5>
		<h3>{title}</h3>
	</div>
</header>

<style lang="scss">
	.header {
		height: 220px;
		width: 100%;
		background-color: var(--color-gray-s2);
		flex-direction: column;
		text-transform: uppercase;
		display: flex;
		justify-content: center;
		gap: 12px;

		.container {
			width: 100%;
		}

		h3 {
			font-weight: var(--fw-bold);
			font-size: var(--text-xl);
		}

		h5 {
			font-size: var(--text-sm);
			font-weight: var(--fw-bold);
		}
	}
</style>
