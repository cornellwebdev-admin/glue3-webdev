<script lang="ts">
	import { onMount } from 'svelte';

	type Option = {
		value: string;
		label: string;
		canRemove: boolean;
	};

	export let options: Option[];
	export let heading: string = '';
	export let placeholder: string = '';
	export let selectedOptions: Option[] = [];
	export let showError: boolean = false;

	let showDropdown = false;
	let search = '';
	let inputElement: HTMLInputElement;
	let dropdownElement: HTMLDivElement;

	const addOption = (option: Option) => {
		if (!selectedOptions.some((o) => o.value === option.value)) {
			selectedOptions = [...selectedOptions, option];
		}
		showDropdown = false;
		search = '';
	};

	const removeOption = (value: string) => {
		selectedOptions = selectedOptions.filter((o) => o.value !== value);
	};

	$: filteredOptions = options.filter(
		(option: Option) =>
			!selectedOptions.some((o) => o.value === option.value) &&
			option.label.toLowerCase().includes(search.toLowerCase())
	);

	const handleClickOutside = (event: Event) => {
		if (inputElement && dropdownElement) {
			if (
				!inputElement.contains(event.target as Node) &&
				!dropdownElement.contains(event.target as Node)
			) {
				showDropdown = false;
			}
		}
	};

	onMount(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<div class="relative flex w-full flex-col" on:keypress={(e) => e.stopPropagation()}>
	<label class="label">
		<span class="label-text text-base font-semibold">{`${heading}`}</span>
	</label>
	<div class="flex w-full max-w-full flex-row flex-wrap items-center justify-start gap-2">
		{#each selectedOptions as options}
			<span
				class=" flex w-fit items-center justify-center rounded-md bg-zinc-200 px-2 text-sm font-medium text-base-content dark:bg-zinc-500">
				{options.label}
				<button
					class={`ml-1  ${options.canRemove ? 'flex' : 'hidden'}`}
					on:click={() => removeOption(options.value)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-x"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M18 6l-12 12" />
						<path d="M6 6l12 12" />
					</svg>
				</button>
			</span>
		{/each}
	</div>
	<input
		type="text"
		{placeholder}
		class={`input input-bordered input-md mt-3 w-full ${showError && 'input-error'}`}
		bind:value={search}
		bind:this={inputElement}
		on:focus={() => (showDropdown = true)} />
	{#if showDropdown}
		<div
			bind:this={dropdownElement}
			class="absolute left-0 top-full z-10 mt-2 max-h-48 w-full overflow-scroll rounded-md border bg-secondary-content shadow-lg">
			<ul class="m-0 list-none p-0">
				{#each filteredOptions as option}
					<li
						class="cursor-pointer border-b p-2 text-sm hover:bg-gray-200"
						on:click={() => addOption(option)}>
						{option.label}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
