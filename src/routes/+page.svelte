<script lang="ts">
	import SectionBoldStatement from '$lib/components/glue/landing/SectionBoldStatement.svelte';
	import SectionFadingCards from '$lib/components/glue/landing/SectionFadingCards.svelte';
	import SectionInfo from '$lib/components/glue/landing/SectionInfo.svelte';
	import SectionRotatingCirclesHero from '$lib/components/glue/landing/SectionRotatingCirclesHero.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import productLogosSrc from '$lib/assets/product-logos.png';
	import growthSrc from '$lib/assets/growth.svg';
	import logoCornletSrc from '$lib/assets/logo-cornlet.png';
	import logoRideHubSrc from '$lib/assets/logo-ridehub.png';
	import logoRsvpSrc from '$lib/assets/logo-rsvp.png';
	import logoGigashipSrc from '$lib/assets/logo-gigaship.svg';
	import logoThrifthubSrc from '$lib/assets/logo-thrifthub.svg';
	import logoReferhubSrc from '$lib/assets/logo-referhub.svg';
	import IconAlertCircle from '$lib/icons/glue/IconAlertCircle.svelte';
	import instagramLogoSrc from '$lib/assets/instagram-logo.svg';
	import slackLogoSrc from '$lib/assets/slack-logo.svg';
	import applyCohortSrc from '$lib/assets/apply-cohort.svg';
	import groupPhotoSrc from '$lib/assets/group-photo-md.png';
	import Modal from '$lib/components/glue/Modal.svelte';
	import IconRightArrowLong from '$lib/icons/glue/IconRightArrowLong.svelte';

	let showModal = false;
</script>

<PageContainer title="Home">
	<SectionRotatingCirclesHero
		heroTopLine="Passion for"
		heroBottomLine="web development"
		desc="Cornell webdev is a software engineering team that is passionate about building performant web applications.">
		<button class="btn-secondary btn gap-2" on:click={() => (showModal = true)}>
			Join us
			<span class="text-xl"><IconRightArrowLong /></span>
		</button>
	</SectionRotatingCirclesHero>
	<SectionFadingCards
		heading="80+ web apps built"
		cardCols={[
			[
				{
					heading: 'Cornlet',
					subheading: 'Sublet marketplace',
					desc: 'Cornell University is a private research university that provides an exceptional education for undergraduates and graduate and professional students.',
					imagePath: logoCornletSrc
				},
				{
					heading: 'RSVP',
					subheading: 'Concert tickets',
					desc: 'RSVP is a ticketing web application for clubs hosting concerts and performances. It caters to the unique structure clubs sell tickets through sales quotas per member.',
					imagePath: logoRsvpSrc
				}
			],
			[
				{
					heading: 'RideHub',
					subheading: 'Carpool with students',
					desc: 'RideHub is a inter-city carpool matching platform that matches people who are looking to carpool to their next destination and people who are looking to monetize empty seats in their car. ',
					imagePath: logoRideHubSrc
				},
				{
					heading: 'ThriftHub',
					subheading: 'Thrifting marketplace',
					desc: 'ThriftHub is a web application that allows students to buy and sell used products. It is essentially Facebook marketplace, catered to the user experience of Cornell students.',
					imagePath: logoThrifthubSrc
				}
			],
			[
				{
					heading: 'Gigaship',
					subheading: 'College job board',
					desc: 'Gigaship is a job board for Cornell students. It allows students to find campus jobs and research positions in a simple, easy to use user interface. It also helps different orgs on campus to find student employees more easily. ',
					imagePath: logoGigashipSrc
				},
				{
					heading: 'ReferHub',
					subheading: 'Job referral matching',
					desc: 'ReferHub is a job referral web application that matches alums wishing to give job referrals and students looking for job referrals. It aims to bridge the disconnect between alums to want to help students and students looking for help in the job market.',
					imagePath: logoReferhubSrc
				}
			]
		]} />

	<SectionBoldStatement
		overline="Our philosophy"
		desc="We don't believe in working on a project for 3 years and trying to deploy the perfect product."
		desc2="We want to deploy an MVP in 1-2 months, see how the market reacts, and iterate based on user analytics and feedback."
		animationString="fade-in 0.5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both">
		<h2
			slot="header"
			class="mt-4 max-w-3xl text-4xl font-extrabold !leading-snug tracking-tight sm:text-5xl">
			Build fast, fail forward
		</h2>
	</SectionBoldStatement>
	<SectionInfo
		overline="Step 1 - Team Matching"
		heading="Attend our team matching socials"
		desc="In the first few weeks of a semester, we host multiple team matching socials, where you can meet and interact with potential teammates for this semester cohort. "
		photoPath={groupPhotoSrc} />
	<SectionInfo
		isReversed={true}
		overline="Step 2 - Application"
		heading="Apply as a team for the semester cohort"
		desc="With the teammates you formed during the team finding socials, apply as a team. We are looking for genuine passion in the idea, strong design and software engineering skills."
		photoPath={applyCohortSrc} />
	<SectionBoldStatement
		overline="Our belief"
		desc="We have a firm belief that if you're smart enough to get into Cornell, you're smart enough to build web apps. We don't require a resume or prior experience to join."
		desc2="We aim to accept at least 80% of the team applications we receive.">
		<h2
			slot="header"
			class="mt-4 max-w-3xl text-4xl font-extrabold !leading-snug tracking-tight sm:text-5xl">
			We strive to be an inclusive team for everyone at Cornell
		</h2>
	</SectionBoldStatement>
	<SectionInfo
		overline="Step 3 - Build"
		heading="Build a web application with your team"
		desc="You will receive constant support and guidance from the mentors in our e-board. We prioritize speed and agility. Our philosophy is to build, launch, and iterate based on user feedback."
		photoPath={productLogosSrc} />
	<SectionInfo
		isReversed={true}
		overline="Step 4 - Demo"
		heading="Complete a MVP by the end of the semester"
		desc="Each team has their own, flexible timeline, but we still highly encourage all teams to at least deploy a MVP by the end of the semester."
		photoPath={growthSrc} />
	<SectionBoldStatement
		overline="Join us"
		desc="Cornell webdev is a software engineering team at Cornell that aims to build performant web applications."
		linkLabel="Join us"
		animationString="fade-in 0.5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both">
		<h2
			slot="header"
			class="mt-4 max-w-3xl text-4xl font-extrabold !leading-snug tracking-tight sm:text-5xl">
			Ready to join our driven team of engineers and designers?
		</h2>
		<button slot="button" class="btn-primary btn mt-10 gap-1" on:click={() => (showModal = true)}>
			Join Us
			<span class="text-xl"><IconRightArrowLong /></span>
		</button>
	</SectionBoldStatement>

	<!-- join us modal -->
	<Modal modalID="join-us-modal" bind:showModal>
		<h3 class="text-3xl font-extrabold">Join us 👋</h3>
		<div class="alert alert-warning mt-4 flex items-start bg-yellow-100 text-yellow-700">
			<span class="text-xl">
				<IconAlertCircle />
			</span>
			<div>
				<p class="text-sm">
					If you're interested in joining, you're highly recommended to attend an in-person, team
					finding session early on in the semester.
				</p>
				<p class="mt-2 text-sm">
					Once we have the cohort for the semester finalized, you won't be able to join in the
					middle of the semester.
				</p>
				<p class="mt-2 text-sm">You're welcome to join us in the following semester!</p>
			</div>
		</div>
		<a
			href="https://www.instagram.com/cornellwebdev/"
			target="_blank"
			rel="noreferrer"
			class="outline-none">
			<button
				class="border-base-content/10 hover:border-base-content/30 mt-6 flex w-full rounded-lg border-2 p-3 text-left">
				<img class="mr-4 mt-1 w-10" src={instagramLogoSrc} />
				<div class="">
					<div class="flex items-center">
						<h4 class="text-lg font-bold">Instagram</h4>
					</div>
					<p class="text-base-content/80 mt-0.5 text-sm">
						Keep up to date by following up on Instagram. We make regular announcements and progress
						updates through posts and stories.
					</p>
				</div>
			</button>
		</a>
		<a
			href="https://join.slack.com/t/cornellwebdev/shared_invite/zt-1nv81i4zb-4vLR4fE4lidPqh4sxgs7jw"
			target="_blank"
			rel="noreferrer"
			class="outline-none">
			<button
				class="border-base-content/10 hover:border-base-content/30 mt-3 flex w-full rounded-lg border-2 p-3 text-left">
				<img class="bg-base-content/10 mr-4 mt-1 w-10 rounded-xl" src={slackLogoSrc} />
				<div class="">
					<div class="flex items-center">
						<h4 class="text-lg font-bold">Slack (public)</h4>
					</div>
					<p class="text-base-content/80 mt-0.5 text-sm">
						We make more detailed announcements for active members on Slack. Feel free to join our
						Slack and listen in on what's going on!
					</p>
				</div>
			</button>
		</a>
	</Modal>
</PageContainer>

<!-- Defining keyframe animations for fade-in fade-out using saos -->
<style>
	@keyframes -global-fade-in {
		0% {
			-webkit-transform: translateY(50px);
			transform: translateY(50px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
