<script lang="ts">
</script>

<div class="dropdown">
	<div class="dropdown__container">
		<slot />
	</div>
</div>

<style lang="scss">
	.dropdown {
		position: absolute;
		width: 100%;
		min-height: 320px;
		background-color: rgb(255, 255, 255);
		z-index: 100;
		
		bottom: 0px;
		transform: translateY(100%);

        &__container {
            display: flex;
            padding: 1.5rem;
			justify-content: center;
            width: 100%;
            height: 100%;
            max-width: 900px;
            margin: 0 auto;
            gap: 3rem;
        }
	}
</style>
