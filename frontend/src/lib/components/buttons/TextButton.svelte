<script lang="ts">
	export let icon: string = null;
	export let iconSize: number = 20;
</script>

<button>
	<slot />
</button>

<style lang="scss">
	button {
		appearance: none;
		border: none;
		outline: none;
		display: flex;
		justify-content: center;
		align-content: center;
        background-color: transparent;
	}
</style>
