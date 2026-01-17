<script lang="ts">
	import type { Education } from '$lib/types/resume';

	interface Props {
		edu: Education;
	}

	let { edu }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	};
</script>

<div
	class="group rounded-lg border border-border-default bg-bg-secondary p-4 transition-all hover:border-border-subtle hover:bg-bg-tertiary"
>
	<h3 class="text-lg font-semibold text-text-primary">
		{edu.studyType || 'Degree'}
		{edu.area ? `in ${edu.area}` : ''}
	</h3>
	<div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
		{#if edu.institution}
			{#if edu.url}
				<a
					href={edu.url}
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="font-medium text-accent-green hover:underline"
					aria-label="Visit {edu.institution} website"
				>
					{edu.institution}
				</a>
			{:else}
				<span class="font-medium">{edu.institution}</span>
			{/if}
		{/if}
		{#if edu.startDate || edu.endDate}
			<span class="text-text-tertiary">•</span>
			<span class="text-text-tertiary">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
		{/if}
	</div>

	{#if edu.score}
		<p class="mt-2 text-sm text-text-secondary">
			<span class="font-medium text-text-primary">GPA:</span>
			{edu.score}
		</p>
	{/if}

	{#if edu.courses && edu.courses.length > 0}
		<div class="mt-3">
			<p class="mb-2 text-sm font-medium text-text-primary">Relevant Courses:</p>
			<div class="flex flex-wrap gap-2">
				{#each edu.courses as course (course)}
					<span
						class="rounded-md bg-bg-tertiary px-2.5 py-1 text-xs text-text-secondary transition-colors hover:bg-accent-green/10 hover:text-accent-green"
					>
						{course}
					</span>
				{/each}
			</div>
		</div>
	{/if}
</div>
