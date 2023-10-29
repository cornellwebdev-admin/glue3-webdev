<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// prop states
	export let heading: string;
	export let type: 'textarea' | 'text';
	export let placeholder: string | undefined = undefined;
	export let required: boolean = false;
	export let inputName: string;
	export let showError: boolean = false;
	export let errorLabel: string = '';

	export let initialValue: string = '';

	// change input
	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		initialValue = target.value;
		dispatch('input', target.value);
		if (required && !target.value) {
			showError = true;
		} else {
			showError = false;
		}
	}
</script>

<div class="form-control w-full gap-1">
	<label class="label">
		<span class="label-text text-base font-semibold">{`${heading}${required ? '*' : ''}`}</span>
		<span class="label-text text-sm text-primary">{errorLabel}</span>
	</label>

	{#if type === 'textarea'}
		<textarea
			class={`textarea textarea-bordered h-24 ${showError && 'textarea-error'} leading-normal`}
			{placeholder}
			name={inputName}
			on:input={handleChange}
			bind:value={initialValue} />
	{:else if type === 'text'}
		<input
			type="text"
			{placeholder}
			class={`input input-bordered input-md w-full max-w-full ${showError && 'input-error'}`}
			name={inputName}
			on:input={handleChange}
			bind:value={initialValue} />
	{/if}
</div>
