<script lang="ts">
	const LINKS = [
		{ name: 'My account', href: '' },
		{ name: 'Blog', href: '' },
		{ name: 'Newsletter', href: '' },
		{ name: 'Help', href: '' }
	];
</script>

<div class="topbar">
	<div class="topbar__items">
		{#each LINKS as link}
			<a href={link.href} class="topbar__item">{link.name} </a>
			<div class="divider" />
		{/each}
	</div>
</div>

<style lang="scss">
	.topbar {
		position: relative;
		top: 0;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 35px;
		font-size: 14px;
		// background-color: #ebebeb;
		background-color: #0D0D0D;
		color: white;
		z-index: 1000;


		&__items {
			display: flex;
            font-weight: var(--fw-medium);
		}

		&__item {
			padding: 10px;
			position: relative;
		}

        a {
            text-transform: capitalize;
        }

		.divider {
			height: 100%;
			width: 1px;
			background-color: rgba(0, 0, 0, 0.192);
		}
	}
</style>
