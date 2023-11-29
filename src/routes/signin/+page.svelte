<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import { APP_NAME } from '$lib/glue/config';
	import IconGoogle from '$lib/icons/glue/IconGoogle.svelte';

	let isActiveMemberConsent = false;
	let isAllowDeleteConsent = false;
	let error = '';

	const signInWithGoogle = async () => {
		if (!isActiveMemberConsent || !isAllowDeleteConsent) {
			error = 'Please check both consent checkboxes above';
		} else {
			error = '';
			const redirectTo = `${$page.url.origin}/redirect?${$page.url.searchParams.toString()}`;

			await $page?.data?.supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo
				}
			});
		}
	};

	afterNavigate(({ from }) => {
		if (from?.url && !$page.url.searchParams.get('redirectTo')) {
			$page.url.searchParams.set('redirectTo', from?.url.pathname + from?.url.search);
			goto(`?${$page.url.searchParams.toString()}`);
		}
	});
</script>

<PageContainer title="Sign in" isHoriPadding={false} limitWidth={false} isVertPadding={false}>
	<div class="flex h-full min-h-[85vh] items-center justify-center bg-base-200 px-4">
		<div
			class="my-8 w-full rounded-xl border border-base-content/20 bg-base-100 px-8 py-16 text-center sm:max-w-sm">
			<h1 class="text-3xl font-bold">Welcome back</h1>
			<p class="mt-2 text-sm text-base-content/70">Sign in to get started with {APP_NAME}</p>

			<div class="form-control mt-6">
				<label class="label cursor-pointer items-start justify-start">
					<input type="checkbox" bind:checked={isActiveMemberConsent} class="checkbox" />
					<span class="label-text ml-4 text-left">I am or was an active member of webdev</span>
				</label>
			</div>

			<div class="form-control mt-1">
				<label class="label cursor-pointer items-start justify-start">
					<input type="checkbox" bind:checked={isAllowDeleteConsent} class="checkbox" />
					<span class="label-text ml-4 text-left">
						I understand that my account can be deleted if I was never an active member of webdev
					</span>
				</label>
			</div>

			<!-- oauth -->
			<div class="mt-6 space-y-4">
				<button
					type="button"
					class="btn-outline btn-block btn mt-2 gap-2"
					on:click={signInWithGoogle}>
					<IconGoogle /> Sign in with Google
				</button>
			</div>

			<p class="mt-4 text-center text-xs text-error">{error}</p>

			<!-- terms -->
			<p class="mt-12 text-xs !leading-normal text-base-content/70">
				By signing in to {APP_NAME}, you agree to our
				<a class="link" href="/terms-conditions" target="_blank" rel="noreferrer">
					terms and conditions
				</a>
				and
				<a class="link" href="/privacy-policy" target="_blank" rel="noreferrer">privacy policy</a>
			</p>
		</div>
	</div>
</PageContainer>
