<script lang="ts">
	import Icon from '@iconify/svelte';
	import SquareButton from '../global/SquareButton.svelte';

	export let icon: string;
	export let title: string;
	export let subtitle: string = null;
	export let button: { text: string; href: string };
	export let iconSize = 50;
</script>

<div class="empty">
	<Icon {icon} color="black" width={iconSize} height={iconSize} />
	<h5>{title}</h5>
	{#if subtitle}
		<p>{subtitle}</p>
	{/if}
	<SquareButton href={button.href} buttonColor="black" hover={false} size="small"
		>{button.text}
	</SquareButton>
</div>

<style lang="scss">
	.empty {
		display: flex;
		gap: 1rem;
		height: 100%;
		width: 100%;
		padding: 1rem 0;
		align-items: center;
		flex-direction: column;

		h5 {
			font-weight: var(--fw-semibold);
			font-size: var(--text-medium);
		}
	}
</style>
