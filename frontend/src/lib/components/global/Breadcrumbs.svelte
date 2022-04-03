<script lang="ts">
	interface History {
		href: string;
		name: string;
	}

	export let history: History[] = [];
</script>

<div class="breadcrumbs">
	{#each history as link, i}
		<a class:back={i !== history.length - 1} href={link.href}>{link.name}</a>
		{#if i < history.length - 1}
			<span>/</span>
		{/if}
	{/each}
</div>

<style lang="scss">
	.breadcrumbs {
		display: flex;
		gap: 10px;
        color: black;
        font-size: 14px;

		.back {
			text-decoration: underline;
		}
	}
</style>
