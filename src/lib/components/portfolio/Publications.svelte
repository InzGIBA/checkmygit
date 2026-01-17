<script lang="ts">
	import type { Publication } from '$lib/types/resume';
	import PublicationItem from '$lib/components/resume/PublicationItem.svelte';

	interface Props {
		publications: Publication[];
		class?: string;
	}

	let { publications, class: className = '' }: Props = $props();
</script>

{#if publications && publications.length > 0}
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
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
			<h3 class="text-lg font-semibold text-text-primary">Publications</h3>
		</div>
		<div class="space-y-4">
			{#each publications as publication}
				<PublicationItem {publication} />
			{/each}
		</div>
	</section>
{/if}
