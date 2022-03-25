<script lang="ts">
	import type { AlignLocation } from '$lib/types/interface';
	import type { AlertType } from '$lib/types/types';
	import { alerts } from '$lib/stores/alerts';
	import { fade, slide, scale, fly } from 'svelte/transition';

	export let type: AlertType;
	export let message: string;
	// export let location: AlignLocation;
	// export let count: number;
</script>

<!-- style="{location.vertical}: {count * 75}px" -->
<div class="alert {type}" transition:fly={{ x: 200, duration: 400 }}>
	{message}
</div>

<style lang="scss">
	.alert {
		position: relative;
		display: flex;
		align-items: center;
		background-color: rgb(255, 255, 255);
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		padding: 1rem;
		min-height: 60px;
		max-width: 250px;
		z-index: 200;
		// position: fixed;
		// bottom: 12px;
		// right: 12px;

		/* Alert Type Options */
		&.danger {
			border-left: 4px solid #dc3545;
		}

		&.warning {
			border-left: 4px solid #ffc107;
		}

		&.success {
			border-left: 4px solid #28a745;
		}

		/* Alert Location Options */
		&.top {
			top: 12px;
		}
		&.bottom {
			bottom: 12px;
		}
		&.right {
			right: 12px;
		}
		&.left {
			left: 12px;
		}
		&.center {
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
