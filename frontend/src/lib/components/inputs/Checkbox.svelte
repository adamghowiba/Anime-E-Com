<script lang="ts">
	export let checked: boolean;
	export let name: string;
	export let value = checked;
</script>

<input type="checkbox" value={checked} {name} bind:checked />

<style lang="scss">
	input {
		appearance: none;
		border: 1px solid var(--color-gray-s1);
		width: 20px;
		height: 20px;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		&:checked {
			background-color: black;
			border: 1px solid black;
			background-image: url('/icons/check.svg');
			background-size: 80%;
			background-position: 50% 50%;
			background-repeat: no-repeat;
		}
	}
</style>
