<script lang="ts">
	import SectionInput from '$lib/components/glue/form/SectionInput.svelte';
	import MultiSelect from '$lib/components/glue/form/Multiselect.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import photoPath from '$lib/assets/product-logos.png';
	import { goto, invalidateAll } from '$app/navigation';
	import imageCompression from 'browser-image-compression';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';

	// img storage paths
	let imgPath = '';
	let imgUrl = '';

	// error states
	let nameError = false;
	let imgError = false;
	let duplicateProject = false;

	// form data
	let projectName: string;
	let projectDescription: string;

	// file data
	let selectedImage: string | null = null;
	let fileInput: HTMLInputElement | null = null;

	let submitting = false;

	type Project = {
		id: string;
		name: string;
		description: string;
		imgUrl: string;
	};

	// supabase data
	export let data;

	type Member = {
		value: string;
		label: string;
		canRemove: boolean;
	};

	let members: Member[] | undefined = [];
	let selectedMembers: Member[] | undefined = [];

	onMount(async () => {
		const { data: allMembers } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName');

		members = allMembers?.map((member) => ({
			value: member.id,
			label: `${member.firstName} ${member.lastName}`,
			canRemove: false
		}));

		const { data: currentMember } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName')
			.eq('id', data?.session?.user.id);

		selectedMembers = currentMember?.map((member) => ({
			value: member.id,
			label: `${member.firstName} ${member.lastName}`,
			canRemove: true
		}));
	});

	// handle image upload
	const handleImgChange = async (): Promise<void> => {
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0];
			if (file) {
				const reader = new FileReader();

				reader.onload = function (e) {
					if (e.target && e.target.result) {
						selectedImage = e.target.result as string;
					}
				};

				reader.readAsDataURL(file);
			}
		}
	};

	// handle image compression and upload
	const uploadPhoto = async (projName: string, imgFile: File): Promise<string | undefined> => {
		if (imgFile) {
			const options = {
				maxSizeMB: 2,
				maxWidthOrHeight: 256,
				useWebWorker: true
			};

			const compressedFile = await imageCompression(imgFile, options);

			console.log(compressedFile);

			const { data: photo, error } = await data?.supabase.storage
				.from('projects')
				.upload(`${projName}.${compressedFile.type.split('/')[1]}`, compressedFile, {
					cacheControl: '3600',
					upsert: true
				});

			if (photo?.path) {
				imgPath = photo?.path;
				const { data: publicUrlData } = data?.supabase.storage
					.from('projects')
					.getPublicUrl(imgPath);
				imgUrl = publicUrlData?.publicUrl;

				return imgUrl;
			}
		}
	};

	// handle form submission for projects
	const handleProjectCreate = async () => {
		submitting = true;
		var projId: string;

		if (projectName) {
			const { data: duplicateData, error: duplicateError } = await data?.supabase
				.from('projects')
				.select('name')
				.eq('name', projectName);

			if (duplicateData == undefined || duplicateData.length > 0) {
				duplicateProject = true;
				nameError = false;
			} else {
				duplicateProject = false;

				if (fileInput && fileInput.files && fileInput.files.length > 0) {
					const file = fileInput.files[0];

					if (file) {
						const imageUrl = await uploadPhoto(projectName, file);

						if (imageUrl) {
							imgError = false;

							const { data: insertData, error } = await data?.supabase
								.from('projects')
								.insert({ name: projectName, description: projectDescription, imgUrl: imageUrl })
								.select();

							const projId = insertData?.[0].id;

							const memberData = selectedMembers?.map((member: Member) => ({
								user_id: member.value,
								project_id: projId
							}));

							await data?.supabase.from('projectUserRelation').insert(memberData);

							await invalidateAll();
							await goto(`/project`);
							toast.push('✅ Your project was successfully registered');
						} else {
							imgError = true;
						}
					} else {
						imgError = true;
					}
				} else {
					imgError = true;
				}
			}
		} else {
			nameError = true;
		}
		submitting = false;
	};
</script>

<PageContainer title="About us" isHoriPadding={false}>
	<div class="flex w-full flex-row items-start justify-evenly">
		<!-- image section -->
		<div class="max-w-1/3 relative mt-48 flex w-2/3">
			<div class="bg-gradient absolute inset-0 origin-bottom-right rotate-3 transform rounded-lg" />
			<div class="z-10 overflow-hidden rounded-lg bg-white p-3 py-24 shadow-lg md:p-6">
				<img src={photoPath} width="1092" height="878" alt="Calendar overlay" loading="lazy" />
			</div>
		</div>

		<div class="ml-24 mt-8 flex w-2/3 flex-col gap-2 p-16">
			<!-- heading -->
			<h3 class="text-base font-semibold text-primary">{'Application → Build'}</h3>
			<h1 class="text-3xl font-bold">Create a New Project</h1>
			<p class=" mt-1 text-sm text-base-content/80">* indictates required field</p>

			<!-- form section -->
			<div class="flex w-full max-w-full flex-col gap-2 py-2">
				<div class="flex flex-row items-end justify-center gap-4">
					<div class="form-control w-full gap-1" />
				</div>

				<MultiSelect
					options={members || []}
					bind:selectedOptions={selectedMembers}
					heading="Members"
					placeholder="Search Members" />

				<SectionInput
					heading="Name"
					type="text"
					placeholder="Name"
					required={true}
					on:input={(e) => (projectName = e.detail)}
					inputName="projName"
					showError={nameError || duplicateProject}
					errorLabel={nameError
						? 'Enter a valid Project Name'
						: duplicateProject
						? 'Duplicate Project Entered'
						: ''} />

				<SectionInput
					heading="Description"
					type="textarea"
					placeholder="Description"
					on:input={(e) => (projectDescription = e.detail)}
					inputName="projDesc" />

				<div class="flex flex-col gap-1">
					<label class="label">
						<span class="label-text text-base font-semibold">Project Image*</span>
					</label>

					<div class="flex flex-col items-start justify-start">
						<input
							bind:this={fileInput}
							on:change={handleImgChange}
							type="file"
							class={`file-input file-input-bordered file-input-sm w-full max-w-xs ${
								imgError && 'border-2 border-red-400'
							}`}
							accept=".png,.jpeg,.jpg,.webp"
							name="imgUpload" />

						{#if selectedImage}
							<img
								src={selectedImage}
								class="mt-6 flex h-24 w-24 items-start justify-start rounded-2xl border-secondary"
								alt="input photo" />
						{/if}
					</div>
				</div>

				<!-- submission -->
				<button
					class="btn btn-primary mt-8 flex w-full flex-row"
					on:click={() => handleProjectCreate()}>
					{#if submitting}
						<span class="loading loading-spinner" />
					{/if}
					Submit
				</button>
			</div>
		</div>
	</div>
</PageContainer>
