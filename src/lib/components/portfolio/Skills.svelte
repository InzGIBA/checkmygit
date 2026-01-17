<script lang="ts">
	import type { Skill } from '$lib/types/resume';
	import SkillGroup from '$lib/components/resume/SkillGroup.svelte';

	interface Props {
		skills: Skill[];
		class?: string;
	}

	let { skills, class: className = '' }: Props = $props();
</script>

{#if skills && skills.length > 0}
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
					d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
				/>
			</svg>
			<h3 class="text-lg font-semibold text-text-primary">Skills</h3>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each skills as skill (skill.name)}
				<SkillGroup {skill} />
			{/each}
		</div>
	</section>
{/if}
