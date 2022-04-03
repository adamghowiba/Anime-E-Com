<script lang="ts">
	import Sidebar from '$lib/components/account/Sidebar.svelte';
</script>

<section class="container container--lg">
	<Sidebar />

	<slot />
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 0.2fr 1fr;
		gap: 3rem;
	}
</style>
