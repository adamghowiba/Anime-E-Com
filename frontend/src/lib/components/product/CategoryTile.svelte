<script lang="ts">
	export let title: string;
	export let imgSrc: string;
	export let links: { href: string; name: string }[];
	export let center: boolean = false;
</script>

<div class="tile">
	<div class="overlay" />
	<img src={imgSrc} alt="" />

	<div class="tile__content" class:center>
		<h4>{title}</h4>
		<div class="tile__buttons">
			{#each links as link}
				<a href="/{link.href}">{link.name}</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.tile {
		position: relative;
		height: 100%;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
			position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
		}

		&__content.center {
			top: 50%;
			bottom: unset;
			transform: translate(-50%, -50%);
		}

        h4 {
            font-weight: var(--fw-semibold);
			color: white;
        }

        a {
            text-decoration: underline;
        }
	}
</style>
