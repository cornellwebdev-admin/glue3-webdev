<script>
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';

	import Card from '$lib/components/glue/resources/Card.svelte';
	import SectionHero from '$lib/components/glue/landing/SectionHero.svelte';

	import { selectedOption } from '$lib/stores/glue/stores';

	let selectedOptionLabel = 'ideation';

	selectedOption.subscribe((value) => {
		selectedOptionLabel = value;
	});

	$: ({ resourceLinks } = $page.data);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<PageContainer title="Resources">
	<SectionHero
		heroTopLine="Resources"
		heroBottomLine="Embrace Learning, &nbsp Fearlessly"
		descBottomLine="Starting web development can be intimidating due to its complexity 
    and myriad of options, but remember, you're not alone. There's a supportive 
    community and abundant resources to guide you from the first step to mastery."
		animationString="" />

	<div class="join join-vertical bg-base-100 gap-8">
		<div class="navbar bg-base-100">
			<div class="navbar-start basis-full">
				<details class="dropdown">
					<summary tabindex="-1" class="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</summary>
					<div
						tabindex="-1"
						class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow lg:hidden">
						<span
							on:click={() => selectedOption.set('ideation')}
							class="btn hover:bg-primary border-none px-16
						{selectedOptionLabel === 'ideation' ? 'bg-primary' : 'bg-base-100'}">
							Ideation
						</span>
						<span
							on:click={() => selectedOption.set('frontend')}
							class="btn hover:bg-primary border-none px-16
						{selectedOptionLabel === 'frontend' ? 'bg-primary' : 'bg-base-100'}">
							Frontend
						</span>
						<span
							on:click={() => selectedOption.set('backend')}
							class="btn btn-primary hover:bg-primary border-none px-16
						{selectedOptionLabel === 'backend' ? 'bg-primary' : 'bg-base-100'}">
							Backend
						</span>
					</div>
				</details>
				<h1 class="text-xl normal-case">Resources</h1>
			</div>
			<div class="navbar-center hidden lg:flex">
				<div class="join">
					<span
						on:click={() => (selectedOptionLabel = 'ideation')}
						class="btn border-none px-16
						{selectedOptionLabel === 'ideation' ? 'btn-accent' : 'btn-base-100'}">
						Ideation
					</span>
					<span
						on:click={() => (selectedOptionLabel = 'frontend')}
						class="btn border-none px-16
						{selectedOptionLabel === 'frontend' ? 'btn-accent' : 'btn-base-100'}">
						Frontend
					</span>
					<span
						on:click={() => (selectedOptionLabel = 'backend')}
						class="btn border-none px-16
						{selectedOptionLabel === 'backend' ? 'btn-accent' : 'btn-base-100'}">
						Backend
					</span>
				</div>
				<!-- <ul tabindex="-1" class="menu menu-horizontal px-1">
					<li><a>Item 1</a></li>
					<li><a>Item 3</a></li>
				</ul> -->
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 xl:grid-cols-3">
			<Card />
			<Card />
			<Card />
		</div>
	</div>
</PageContainer>

<style>
	@keyframes -global-scale-in-center {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
