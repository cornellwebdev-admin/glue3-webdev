<script lang="ts">
	export let placement: 'left' | 'right' | 'middle' = 'right';
	export let size: 'md' | 'lg' | 'xl' = 'md';
	export let color: string = '244,63,94';
</script>

<div
	class="absolute top-0 bottom-0 right-0 left-0 -z-10 flex items-center
	{placement === 'left' ? 'justify-start' : ''}
	{placement === 'middle' ? 'justify-center' : ''}
	{placement === 'right' ? 'justify-end' : ''}"
	style="--gradient-color: {color}">
	<div
		class="bg-radial-gradient pointer-events-none h-[500px] w-[500px] opacity-[.2]
	{size === 'lg' ? 'md:h-[750px] md:w-[750px]' : ''}
	{size === 'xl' ? 'md:h-[1000px] md:w-[1000px]' : ''}" />
</div>

<style>
	.bg-radial-gradient {
		background-image: radial-gradient(
			50% 50% at 50% 50%,
			rgb(var(--gradient-color)) 0%,
			rgba(255, 255, 255, 0) 100%
		);
	}
</style>
