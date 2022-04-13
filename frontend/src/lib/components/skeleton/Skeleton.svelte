<script lang="ts">
	type SkeletonStyle = 'rect' | 'circle';
	type AnimationStyle = 'pulse' | 'wave';

	export let style: SkeletonStyle = 'rect';
	export let width: string = '200px';
	export let height: string = '200px';
	export let animation: AnimationStyle = 'wave';
</script>

<div
	class="skeleton style--{style} animation--{animation}"
	style="--width:{width}; --height:{height};"
/>

<style lang="scss">
	.skeleton {
		position: relative;
		width: var(--width, 100px);
		height: var(--height, 50px);
		border-radius: 4px;
		overflow: hidden;
		background-color: rgba(156, 156, 156, 0.13);
	}
	.style {
		&--circle {
			border-radius: 50%;
		}
	}
	.animation--pulse {
		background: rgb(73, 73, 73);
		animation: pulse 1.35s infinite;
	}
	.animation--wave::before {
		content: '';
		display: block;
		height: 100%;
		position: absolute;
		left: 0;
		height: 100%;
		width: 50%;
		border-radius: inherit;
		background: rgba(73, 73, 73, 0.456);
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.48), transparent);
		animation: wave 1.6s infinite;
	}

	@keyframes pulse {
		0% {
			background: rgb(73, 73, 73);
		}
		50% {
			background: rgba(73, 73, 73, 0.432);
		}
		100% {
			background: rgb(73, 73, 73);
		}
	}
	@keyframes wave {
		0% {
			left: -100%;
		}
		100% {
			left: var(--width);
		}
	}
</style>
