<script lang="ts">
	import type { Volunteer } from '$lib/types/resume';

	interface Props {
		volunteer: Volunteer;
	}

	let { volunteer }: Props = $props();

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
			<h3 class="text-lg font-semibold text-text-primary">{volunteer.position || 'Volunteer'}</h3>
			<div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
				{#if volunteer.organization}
					{#if volunteer.url}
						<a
							href={volunteer.url}
							target="_blank"
							rel="noopener noreferrer"
							class="font-medium text-accent-green hover:underline"
						>
							{volunteer.organization}
						</a>
					{:else}
						<span class="font-medium">{volunteer.organization}</span>
					{/if}
				{/if}
				<span class="text-text-tertiary">•</span>
				<span class="text-text-tertiary"
					>{formatDate(volunteer.startDate)} - {formatDate(volunteer.endDate)}</span
				>
			</div>
		</div>
	</div>

	{#if volunteer.summary}
		<p class="mt-3 text-sm leading-relaxed text-text-secondary">{volunteer.summary}</p>
	{/if}

	{#if volunteer.highlights && volunteer.highlights.length > 0}
		<ul class="mt-3 space-y-2 text-sm text-text-secondary">
			{#each volunteer.highlights as highlight}
				<li class="flex gap-2">
					<span class="mt-1 text-accent-green">•</span>
					<span class="flex-1">{highlight}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
