<script lang="ts">
	import type { Education } from '$lib/types/resume';
	import EducationItem from '$lib/components/resume/EducationItem.svelte';

	interface Props {
		education: Education[];
		class?: string;
	}

	let { education, class: className = '' }: Props = $props();
</script>

{#if education && education.length > 0}
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
					d="M12 14l9-5-9-5-9 5 9 5z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
				/>
			</svg>
			<h3 class="text-lg font-semibold text-text-primary">Education</h3>
		</div>
		<div class="space-y-4">
			{#each education as edu, i ((edu.institution || '') + (edu.startDate || '') + i)}
				<EducationItem {edu} />
			{/each}
		</div>
	</section>
{/if}
