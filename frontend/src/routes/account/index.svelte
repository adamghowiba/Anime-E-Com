<script lang="ts">
	import Sidebar from '$lib/components/account/Sidebar.svelte';
	import AccountCard from '$lib/components/account/AccountCard.svelte';
	import EmptyCard from '$lib/components/account/EmptyCard.svelte';
</script>

<section class="highlight">
	<div class="highlight__column">
		<AccountCard title="my profile" headerButton={{ text: 'Edit profile', href: '/' }}>
			<div class="account">
				<span><b>Name:</b> Adam Ghowiba</span>
				<span><b>Email:</b> Adam Ghowiba</span>
				<span><b>Address:</b> 1020 Waverly Dr. Longwood FL 32750, US </span>
			</div>
		</AccountCard>
		<AccountCard title="Wishlist">
			<EmptyCard
				icon="akar-icons:heart"
				title="No items on your wishlist"
				button={{ href: '', text: 'start shopping' }}
			/>
		</AccountCard>
	</div>

	<div class="highlight__orders">
		<AccountCard title="my last order">
			<EmptyCard
				icon="akar-icons:shipping-box-01"
				title="You have not placed any orders yet."
				button={{ href: '', text: 'start shopping' }}
			/>
		</AccountCard>
	</div>
</section>

<style lang="scss">
	.account {
		display: flex;
		flex-direction: column;
		gap: 10px;
		b {
			font-weight: bold;
		}
	}
	.highlight {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		&__column {
			display: flex;
			gap: 2rem;
		}

		&__orders {
		}
	}
</style>
