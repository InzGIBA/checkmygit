<script lang="ts">
	import type { WorkExperience } from '$lib/types/resume';
	import WorkItem from '$lib/components/resume/WorkItem.svelte';

	interface Props {
		work: WorkExperience[];
		class?: string;
	}

	let { work, class: className = '' }: Props = $props();
</script>

{#if work && work.length > 0}
	<section class="space-y-4 {className}">
		<div class="mb-4 flex items-center gap-2">
			<svg
				class="h-5 w-5 text-text-tertiary"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
			<h3 class="text-lg font-semibold text-text-primary">Work Experience</h3>
		</div>
		<div class="space-y-4">
			{#each work as job, i ((job.name || '') + (job.startDate || '') + i)}
				<WorkItem {job} />
			{/each}
		</div>
	</section>
{/if}
