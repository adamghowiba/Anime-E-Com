<script lang="ts">
	import ToggleList from '$lib/components/account/ToggleList.svelte';
	import Breadcrumbs from '$lib/components/global/Breadcrumbs.svelte';
	import SquareButton from '$lib/components/buttons/SquareButton.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	const profile = { username: '' };

	let savedAddresses = false;
</script>

<section>
	<Breadcrumbs history={[{ href: '/', name: 'Account' }, { href: '/', name: 'My Profile' }]} />
	<!-- Account Settings -->
	<ToggleList title="MY ACCOUNT SETTINGS" isExpanded>
		<form class="profile">
			<div class="column">
				<TextInput name="email" label="First name" type="email" bind:value={profile.username} />
				<TextInput
					name="password"
					label="Last Name"
					type="password"
					bind:value={profile.username}
				/>
			</div>
			<TextInput name="password" label="Phone" type="phone" bind:value={profile.username} />
			<SquareButton buttonColor="black" width="100%" icon={null} size="small">SAVE</SquareButton>
		</form>
	</ToggleList>

	<!-- Address -->
	<ToggleList title="ADDRESS BOOK" isExpanded>
		{#if savedAddresses}
			<form class="profile">
				<div class="column">
					<TextInput name="email" label="First name" type="email" bind:value={profile.username} />
					<TextInput
						name="password"
						label="Last Name"
						type="password"
						bind:value={profile.username}
					/>
				</div>
				<TextInput name="password" label="Phone" type="phone" bind:value={profile.username} />
				<SquareButton buttonColor="black" width="100%" icon={null} size="small">SAVE</SquareButton>
			</form>
		{:else}
			<p>You do not have any saved addresses. You can now enter an address.</p>
		{/if}
	</ToggleList>

	<!-- Email Address -->
	<ToggleList title="EMAIL ADDRESS">
		<p>
			You can change your account email address here. Your newsletter email will automatically be
			updated.
		</p>
		<form class="profile">
			<TextInput name="email" label="Old Email" type="email" bind:value={profile.username} />
			<TextInput name="password" label="New Email" type="email" bind:value={profile.username} />
			<TextInput name="password" label="Password" type="password" bind:value={profile.username} />
			<SquareButton buttonColor="black" width="100%" icon={null} size="small">SAVE</SquareButton>
		</form>
	</ToggleList>

	<!-- Password Change -->
	<ToggleList title="PASSWORD">
		<p>
			To change your password, you must first enter your old password in order to set a new
			password. New password must be at least 8 characters long.
		</p>
		<form class="profile">
			<TextInput name="email" label="Old Password" type="password" bind:value={profile.username} />
			<TextInput
				name="password"
				label="New Password"
				type="password"
				bind:value={profile.username}
			/>
			<TextInput
				name="password"
				label="Retype new password"
				type="password"
				bind:value={profile.username}
			/>
			<SquareButton buttonColor="black" width="100%" icon={null}>SAVE</SquareButton>
		</form>
	</ToggleList>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		p {
			font-size: 14px;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.column {
			display: flex;
			width: 100%;
			gap: 1rem;
		}
	}
</style>
