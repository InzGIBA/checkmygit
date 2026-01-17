<script lang="ts">
	import type { Award } from '$lib/types/resume';

	interface Props {
		award: Award;
	}

	let { award }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	};
</script>

<div
	class="group rounded-lg border border-border-default bg-bg-secondary p-4 transition-all hover:border-border-subtle hover:bg-bg-tertiary"
>
	<div class="flex items-start gap-3">
		<div class="mt-1 flex-shrink-0">
			<svg class="h-5 w-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
				/>
			</svg>
		</div>
		<div class="flex-1">
			<h3 class="font-semibold text-text-primary">{award.title || 'Award'}</h3>
			<div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
				{#if award.awarder}
					<span class="font-medium">{award.awarder}</span>
				{/if}
				{#if award.date}
					{#if award.awarder}
						<span class="text-text-tertiary">•</span>
					{/if}
					<span class="text-text-tertiary">{formatDate(award.date)}</span>
				{/if}
			</div>

			{#if award.summary}
				<p class="mt-2 text-sm leading-relaxed text-text-secondary">{award.summary}</p>
			{/if}
		</div>
	</div>
</div>
