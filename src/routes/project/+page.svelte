<script>
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import SectionBoldStatement from '$lib/components/glue/landing/SectionBoldStatement.svelte';
	import Saos from 'saos';

	$: ({ projects } = $page.data);
</script>

<PageContainer title="Projects">
	<SectionBoldStatement
		overline="Our projects"
		heading="We've built so many things out of interest and passion"
		desc="Our projects are either solving critical problems for the Cornell community or were a fun experience to build something cool " />
	<Saos animation={'fade-in 0.5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'} once={true}>
		<div class="mb-32 flex justify-center">
			<div class="w-full max-w-3xl">
				<h1 class="text-4xl font-extrabold">Our projects</h1>
				<p class="mt-8 text-base-content/80">
					Some of our projects have been discontinued, and that's totally okay! We like to emphasize
					building whatever interests you quickly, deploying, and seeing how the market reacts.
				</p>
				<p class="mt-3 text-base-content/80">
					Even if the market responds poorly, there's so much to be learned from a "failed" project.
					These lessons often equip us with valuable insights that help propel the next project.
				</p>
				<div class="mt-12">
					{#each projects as project (project.id)}
						<div class="my-6 flex">
							<img class="w-40 rounded-xl bg-base-content/10" src={project?.imgUrl} />
							<div class="ml-6">
								<h3 class="text-3xl font-extrabold">{project?.name}</h3>
								<p class="mt-2 whitespace-pre-wrap leading-relaxed text-base-content/80">
									{project?.description}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Saos>
</PageContainer>
