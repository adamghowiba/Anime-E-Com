<script lang="ts">
	import Skeleton from './Skeleton.svelte';
	type SkeletonSize = 'small' | 'large';

	export let size: SkeletonSize = 'small';
</script>

<div class="skeleton {size}">
	<div class="skeleton__image">
		<Skeleton animation="wave" height="100%" width="100%" />
	</div>

	<div class="skeleton__info">
		<div class="skeleton__header">
			<Skeleton animation="wave" height="16px" width="50%" />
		</div>

		<div class="skeleton__variants">
			<Skeleton animation="wave" height="8px" width="70px" />
			<Skeleton animation="wave" height="8px" width="70px" />
			<Skeleton animation="wave" height="8px" width="25px" />
		</div>

		<div class="skeleton__actions">
			<div class="skeleton__ticker">
				<Skeleton animation="wave" height="35px" width="90px" />
			</div>
			<div class="skeleton__button">
				<Skeleton animation="wave" height="8px" width="40px" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.skeleton {
		display: flex;
		gap: 12px;
		width: 100%;
		padding-bottom: 20px;

		&__image {
			width: 100px;
		}

		&.large &__image {
			width: 215px;
			height: 215px;
		}

		&__variants {
			display: flex;
			flex-direction: column;
			margin-bottom: 12px;
			gap: 7px;
		}

		&__info {
			display: flex;
			gap: 12px;
			flex-grow: 1;
			flex-direction: column;
		}

		&__actions {
			display: flex;
			margin-top: auto;
			align-items: center;
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
