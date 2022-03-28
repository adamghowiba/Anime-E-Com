<script lang="ts">
	import Icon from '@iconify/svelte';

	export let saved: boolean;
</script>

<button class="heart" class:saved on:click>
	<Icon icon="ant-design:heart-outlined" width={20} height={20} />
</button>

<style lang="scss">
	.heart {
		position: absolute;
		top: 12px;
		right: 12px;
		background-color: hsla(60, 25%, 98%, 0.8);
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		backdrop-filter: blur(20px);
		border-radius: 50%;
		// width:  35px;
		// height: 35px;
		padding: 7px;
		display: flex;
		justify-content: center;
		align-items: center;
		appearance: none;
		border: none;
		outline: none;

		&.saved {
			background-color: coral;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>
