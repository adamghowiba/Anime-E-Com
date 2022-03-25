<script lang="ts">
	export let imgSrc: string;
	export let price: number;
	export let title: string;
	export let newItem: boolean = false;
	export let features: string[] = null;
	export let sizes: string[] = null;
</script>

<div class="card">
	<div class="card__image-wrap">
		<img class="card__image" src={imgSrc} alt="" />

		<div class="actions">
			<div class="actions__button">Save</div>
			<div class="actions__button">Quickview</div>
		</div>

		<!-- {#if sizes}
			<div class="quickadd">
				<p>quick add</p>

				<div class="quickadd__options">
					{#each sizes as size}
						<div class="quickadd__option">{size}</div>
					{/each}
				</div>
			</div>
		{/if} -->
	</div>

	<div class="card__header">
		{#if newItem}
			<div class="card__badge">
				<span>NEW</span>
			</div>
		{/if}
		<span class="card__price">${price}</span>
	</div>

	<p class="card__title">
		{title}
	</p>

	{#if features}
		<div class="card__features">
			{#each features as feature, i}
				<span>{feature}</span>
				{#if i < features.length - 1}
					<div class="card__divider" />
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.actions {
		display: flex;
		gap: 1rem;
		position: absolute;
		bottom: 5px;
		width: 100%;
		padding: 0 5px;

		&__button {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 9px;
			font-size: 13px;
			background-color: hsla(60, 25%, 98%, 0.8);
			// background-color: rgba(255, 179, 93, 0.445);
			font-weight: var(--fw-semibold);
			backdrop-filter: blur(20px);
		}
	}
	.quickadd {
		position: absolute;
		opacity: 0;
		width: 94%;
		padding: 1rem;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(255, 255, 255, 0.479);
		backdrop-filter: blur(15px);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		transition: opacity 0.14s linear;

		p {
			text-transform: uppercase;
			font-weight: var(--fw-bold);
		}

		&__options {
			display: flex;
			flex-wrap: wrap;
			gap: 7px;
			max-width: 220px;
			font-size: var(--text-sm);
			font-weight: var(--fw-medium);
		}

		&__option {
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			transition: background-color 0.14s linear, color 0.14s linear;
			cursor: pointer;
			text-transform: uppercase;
		}

		&__option:hover {
			background-color: black;
			color: white;
		}
	}
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 8px;

		&:hover .quickadd {
			opacity: 1;
		}

		&__image-wrap {
			position: relative;
			display: block;
			height: 100%;
			max-width: 100%;
			max-height: 500px;
			object-fit: cover;
		}

		&__header {
			display: flex;
			justify-content: space-between;
			font-weight: var(--fw-semibold);
			align-items: center;
		}

		&__image {
			display: block;
			height: 100%;
			width: 100%;
			max-height: 500px;
			object-fit: cover;
		}

		&__title {
			color: #444444;
			max-width: 75%;
		}

		&__badge {
			padding: 5px 0;
			padding-left: 5px;
			font-weight: var(--fw-bold);
			font-size: 11px;
			text-transform: uppercase;
			border-left: 3px solid black;
		}

		&__features {
			display: flex;
			gap: 10px;
			font-size: 14px;
			color: #6e6e6e;
			text-transform: capitalize;
		}
		&__divider {
			height: 100%;
			width: 1px;
			background-color: gray;
		}
	}
</style>
