<script lang="ts">
	const ICONS = ['heart'] as const;

	export let icon: typeof ICONS[number];
	export let iconColor = 'black';
	export let fillColor = 'transparent';
</script>

{#if icon == 'heart'}
	<svg
		width="20px"
		height="15px"
		viewBox="0 0 20 15"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<title>Icons/Functional/Wishlist/Empty/black</title>
		<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<g id="Product-List-Page-(Mobile)" transform="translate(-81.000000, -64.000000)">
				<g
					id="HeaderFooter/Header/375/Mobile_Header-White-Copy"
					transform="translate(0.000000, 40.000000)"
				>
					<g id="Group-3" transform="translate(79.000000, 19.500000)">
						<polygon id="Fill-1" points="0 24 24 24 24 0 0 0" />
						<polygon
							id="Stroke-2"
							stroke="{iconColor}"
							fill="{fillColor}"
							stroke-width="2"
							points="9.377 6 6.424 6 4 10 12 18 20 10 17.594 6 14.605 6 12 9"
						/>
					</g>
				</g>
			</g>
		</g>
	</svg>
{/if}

<style lang="scss">
</style>
