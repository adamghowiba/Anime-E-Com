<script lang="ts">
	export let title;
</script>

<div class="group">
	<h5>{title}</h5>

	<div class="group__links">
		<slot />
	</div>
</div>

<style lang="scss">
	.group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;

		&__links {
			display: flex;
			flex-direction: column;
			gap: 10px;
			font-size: 14px;
		}

		h5 {
			font-size: 16px;
			text-transform: uppercase;
			color: black;
			font-weight: var(--fw-bold);
            min-height: 1em;
		}
	}
</style>
