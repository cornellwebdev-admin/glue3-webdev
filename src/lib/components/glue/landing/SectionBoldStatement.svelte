<script lang="ts">
	import RadialGradient from './RadialGradient.svelte';

	export let overline: string = 'Our mission';
	export let desc: string = '';
	export let desc2: string = '';
	export let linkLabel: string = '';
	export let animationString: string = '';
	import Saos from 'saos';
</script>

<section class="relative min-h-[60vh] overflow-hidden px-8 py-16 text-center md:pt-48">
	<RadialGradient />
	<Saos animation={animationString} once={true} top={150} bottom={150}>
		<p class="text-primary text-lg font-bold">{overline}</p>
		<div class="flex justify-center">
			<h2 class="mt-4 max-w-3xl text-4xl font-extrabold !leading-snug tracking-tight sm:text-5xl">
				<slot name="header" />
			</h2>
		</div>
		{#if desc}
			<p
				class="text-md text-base-content/70 mx-auto mt-10 max-w-xl font-normal leading-relaxed md:text-lg">
				{desc}
			</p>
		{/if}
		{#if desc2}
			<p
				class="text-md text-base-content/70 mx-auto mt-4 max-w-xl font-normal leading-relaxed md:text-lg">
				{desc2}
			</p>
		{/if}
		{#if linkLabel}
			<slot name="button" />
		{/if}
	</Saos>
</section>
