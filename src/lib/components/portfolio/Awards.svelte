<script lang="ts">
	import type { Award } from '$lib/types/resume';
	import AwardItem from '$lib/components/resume/AwardItem.svelte';

	interface Props {
		awards: Award[];
		class?: string;
	}

	let { awards, class: className = '' }: Props = $props();
</script>

{#if awards && awards.length > 0}
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
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h3 class="text-lg font-semibold text-text-primary">Awards & Certificates</h3>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each awards as award}
				<AwardItem {award} />
			{/each}
		</div>
	</section>
{/if}
