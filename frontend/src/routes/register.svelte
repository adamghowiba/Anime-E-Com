<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	let username: string;
</script>

<section>
	<header>
		<h5>Create an account</h5>
		<p class="desc">
			Sign up and you’ll be able to manage your account, track orders, save products and access
			easier returns
		</p>
	</header>

	<form>
		<TextInput name="email" label="Email address" type="email" bind:value={username} />
		<TextInput name="password" label="Password" type="password" bind:value={username} />

		<SelectInput
			required
			values={['Choose gender', 'Male', 'Female', 'Prefer Not To Say']}
			name="gender"
			label="gender"
		/>

		<TextInput
			name="first-name"
			label="First Name"
			type="password"
			required
			bind:value={username}
		/>
		<TextInput name="last-name" label="Last Name" type="password" required bind:value={username} />
		<Button buttonColor="black" width="100%">LOG IN</Button>
	</form>

	<span class="login">
		Already registered?
		<a href="/login" class="create-account">Sign Into Your Account </a>
	</span>

	<p class="terms">
		By creating your account, you agree to our <a href="/" class="terms__link"
			>Terms & Conditions
		</a>
		For full details on how and why Gymshark uses your personal data please see our
		<a href="/" class="terms__link">Privacy Notice</a>.
	</p>
</section>

<style lang="scss">
	section {
		padding: 4rem 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 300px;
		margin: 0 auto;
		gap: 2rem;

		h5 {
			font-weight: var(--fw-bold);
			text-transform: uppercase;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		header {
			display: flex;
			flex-direction: column;
			gap: 12px;
			text-align: center;
		}

		.desc {
			font-size: 11px;
			color: #000000;
			font-weight: var(--fw-medium);
			line-height: 1.5;
		}

		.create-account {
			text-decoration: underline;
			color: var(--color-blue);
			font-weight: var(--fw-semibold);
		}

		.login {
			margin-top: -12px;
		}

		span {
			font-size: var(--text-xsm);
			text-align: center;
		}
	}
	.terms {
		font-size: var(--text-xsm);
		line-height: 1.4;
		color: #6e6e6e;

		&__link {
			color: black;
			text-decoration: underline;
			font-weight: var(--fw-semibold);
		}
	}
</style>
