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
	import { page } from '$app/stores';

	let projectId: string;

	type Member = {
		value: string;
		label: string;
		canRemove: boolean;
	};

	let members: Member[] | undefined = [];
	let selectedMembers: Member[] | undefined = [];

	let project: Project | undefined;

	onMount(async () => {
		let projectId = window.location.pathname.split('/').pop();

		const { data: allMembers } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName');

		members = allMembers?.map((member) => ({
			value: member.id,
			label: `${member.firstName} ${member.lastName}`,
			canRemove: true
		}));

		const { data: projectMembers } = await data?.supabase
			.from('profiles')
			.select('id,firstName, lastName')
			.eq('project_id', projectId);

		selectedMembers = projectMembers
			? projectMembers?.map((member) => ({
					value: member.id,
					label: `${member.firstName} ${member.lastName}`,
					canRemove: false
			  }))
			: [];

		const { data: projectData } = await data?.supabase
			.from('projects')
			.select('id, name, description, imgUrl')
			.eq('id', projectId);

		project = projectData ? projectData[0] : undefined;
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

	// handle project update
	const handleProjectUpdate = async (projectId: string) => {
		submitting = true;

		if (projectName) {
			const { data: duplicateData, error: duplicateError } = await data?.supabase
				.from('projects')
				.select('name')
				.eq('name', projectName)
				.neq('id', projectId);

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

							const { data: updateData, error } = await data?.supabase
								.from('projects')
								.update({ name: projectName, description: projectDescription, imgUrl: imageUrl })
								.eq('id', projectId);

							await data?.supabase.from('projectUserRelation').delete().eq('project_id', projectId);

							const memberData = selectedMembers?.map((member: Member) => ({
								user_id: member.value,
								project_id: projectId
							}));

							await data?.supabase.from('projectUserRelation').insert(memberData);

							await invalidateAll();
							await goto(`/project/${projectId}`);
							toast.push('✅ Your project was successfully updated');
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
			<h3 class="text-base font-semibold text-primary">{'Application → Update'}</h3>
			<h1 class="text-3xl font-bold">Update Project</h1>

			<!-- form section -->
			<div class="flex w-full max-w-full flex-col gap-2 py-2">
				<div class="flex flex-row items-end justify-center gap-4">
					<div class="form-control w-full gap-1" />
				</div>

				<MultiSelect
					options={members || []}
					bind:selectedOptions={selectedMembers}
					heading="Members"
					placeholder="Search to add members" />

				<SectionInput
					heading="Name"
					type="text"
					placeholder="Name"
					required={true}
					initialValue={project?.name}
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
					initialValue={project?.description}
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

						{#if project?.imgUrl || selectedImage}
							<img
								src={project?.imgUrl ?? selectedImage}
								class="mt-6 flex h-24 w-24 items-start justify-start rounded-2xl border-secondary"
								alt="input photo" />
						{/if}
					</div>
				</div>

				<!-- submission -->
				<button
					class="btn btn-primary mt-8 flex w-full flex-row"
					on:click={() => handleProjectUpdate(projectId)}>
					{#if submitting}
						<span class="loading loading-spinner" />
					{/if}
					Update
				</button>
			</div>
		</div>
	</div>
</PageContainer>
