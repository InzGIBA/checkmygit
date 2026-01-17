<script lang="ts">
	import type { Publication } from '$lib/types/resume';

	interface Props {
		publication: Publication;
	}

	let { publication }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	};
</script>

<div
	class="group rounded-lg border border-border-default bg-bg-secondary p-4 transition-all hover:border-border-subtle hover:bg-bg-tertiary"
>
	<h3 class="font-semibold text-text-primary">
		{#if publication.url}
			<a
				href={publication.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1 text-accent-green hover:underline"
			>
				{publication.name || 'Publication'}
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
			{publication.name || 'Publication'}
		{/if}
	</h3>
	<div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
		{#if publication.publisher}
			<span class="font-medium">{publication.publisher}</span>
		{/if}
		{#if publication.releaseDate}
			{#if publication.publisher}
				<span class="text-text-tertiary">•</span>
			{/if}
			<span class="text-text-tertiary">{formatDate(publication.releaseDate)}</span>
		{/if}
	</div>

	{#if publication.summary}
		<p class="mt-2 text-sm leading-relaxed text-text-secondary">{publication.summary}</p>
	{/if}
</div>
