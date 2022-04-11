<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { alertLocation, alerts } from '$lib/stores/alerts';
	import { onMount } from 'svelte';

	let username: string;
	let alertCount = 0;

	onMount(() => {});
</script>

<section>
	<h5>Login to your account</h5>

	<form>
		<TextInput name="email" label="Email address" type="email" bind:value={username} />
		<TextInput name="password" label="Password" type="password" bind:value={username} />
		<Button buttonColor="black" width="100%">LOG IN</Button>
	</form>

	<a href="/" class="forgot-password">I've forgotten my password </a>

	<span class="register">
		New To Anime Store
		<a href="/register" class="create-account">Create an account </a>
	</span>

</section>

<style lang="scss">
	section {
		padding: 4rem 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 280px;
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

		.forgot-password {
			text-decoration: underline;
			margin-top: -15px;
		}

		.create-account {
			text-decoration: underline;
			color: var(--color-blue);
			font-weight: var(--fw-semibold);
		}

		span,
		.forgot-password {
			font-size: var(--text-xsm);
			text-align: center;
		}
	}
</style>
