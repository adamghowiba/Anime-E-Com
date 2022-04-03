<script lang="ts">
	import AccountCard from '$lib/components/account/AccountCard.svelte';
	import EmptyCard from '$lib/components/account/EmptyCard.svelte';
import Breadcrumbs from '$lib/components/global/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>Wishlist</title>
</svelte:head>

<section>
	<Breadcrumbs history={[{ href: '/', name: 'Account' }, { href: '/', name: 'My Profile' }]} />

	<AccountCard title="Wishlist">
		<EmptyCard
			icon="akar-icons:heart"
			title="No items on your wishlist"
			button={{ href: '', text: 'start shopping' }}
		/>
	</AccountCard>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
