<script lang="ts">
	import Icon from '@iconify/svelte';
	import LocalIcon from '../global/LocalIcon.svelte';

	export let saved: boolean;
</script>

<button class="heart" class:saved on:click>
	<LocalIcon icon="heart" fillColor={saved ? 'black' : 'transparent'} />
	<!-- <Icon icon="ant-design:heart-outlined" width={20} height={20} /> -->
</button>

<style lang="scss">
	.heart {
		position: absolute;
		top: 12px;
		right: 12px;
		background-color: transparent;
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
		z-index: 1;

		&:hover {
			cursor: pointer;
		}
	}
</style>
