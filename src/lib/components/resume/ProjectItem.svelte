<script lang="ts">
	import type { Project } from '$lib/types/resume';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

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
			<h3 class="text-lg font-semibold text-text-primary">
				{#if project.url}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 text-accent-green hover:underline"
					>
						{project.name || 'Project'}
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				{:else}
					{project.name || 'Project'}
				{/if}
			</h3>
			<div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
				{#if project.entity}
					<span class="font-medium">{project.entity}</span>
					<span class="text-text-tertiary">•</span>
				{/if}
				{#if project.roles && project.roles.length > 0}
					<span>{project.roles.join(', ')}</span>
					<span class="text-text-tertiary">•</span>
				{/if}
				<span class="text-text-tertiary"
					>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span
				>
			</div>
		</div>
	</div>

	{#if project.description}
		<p class="mt-3 text-sm leading-relaxed text-text-secondary">{project.description}</p>
	{/if}

	{#if project.highlights && project.highlights.length > 0}
		<ul class="mt-3 space-y-2 text-sm text-text-secondary">
			{#each project.highlights as highlight}
				<li class="flex gap-2">
					<span class="mt-1 text-accent-green">•</span>
					<span class="flex-1">{highlight}</span>
				</li>
			{/each}
		</ul>
	{/if}

	{#if project.keywords && project.keywords.length > 0}
		<div class="mt-3 flex flex-wrap gap-2">
			{#each project.keywords as keyword}
				<span
					class="rounded-md bg-bg-tertiary px-2.5 py-1 text-xs text-text-secondary transition-colors hover:bg-accent-green/10 hover:text-accent-green"
				>
					{keyword}
				</span>
			{/each}
		</div>
	{/if}
</div>
