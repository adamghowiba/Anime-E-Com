<script lang="ts">
	import AccountCard from '$lib/components/account/AccountCard.svelte';
	import EmptyCard from '$lib/components/account/EmptyCard.svelte';
import Breadcrumbs from '$lib/components/global/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>My Orders</title>
</svelte:head>

<section>
	<Breadcrumbs history={[{ href: '/', name: 'Account' }, { href: '/', name: 'My Profile' }]} />

	<AccountCard title="My Orders">
		<EmptyCard
			icon="akar-icons:shipping-box-01"
			title="You have not placed any orders yet."
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
