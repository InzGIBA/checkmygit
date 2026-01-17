<script lang="ts">
	import type { WorkExperience } from '$lib/types/resume';

	interface Props {
		job: WorkExperience;
	}

	let { job }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return 'Present';
		return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	};
</script>

<div
	class="group rounded-lg border border-border-default bg-bg-secondary p-4 transition-all hover:border-border-subtle hover:bg-bg-tertiary"
>
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<h3 class="text-lg font-semibold text-text-primary">{job.position || 'Position'}</h3>
			<div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
				{#if job.name}
					{#if job.url}
						<a
							href={job.url}
							target="_blank"
							rel="noopener noreferrer"
							data-sveltekit-preload-data="off"
							class="font-medium text-accent-green hover:underline"
						>
							{job.name}
						</a>
					{:else}
						<span class="font-medium">{job.name}</span>
					{/if}
				{/if}
				<span class="text-text-tertiary">•</span>
				<span class="text-text-tertiary">{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
			</div>
		</div>
	</div>

	{#if job.summary}
		<p class="mt-3 text-sm leading-relaxed text-text-secondary">{job.summary}</p>
	{/if}

	{#if job.highlights && job.highlights.length > 0}
		<ul class="mt-3 space-y-2 text-sm text-text-secondary">
			{#each job.highlights as highlight (highlight)}
				<li class="flex gap-2">
					<span class="mt-1 text-accent-green">•</span>
					<span class="flex-1">{highlight}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
