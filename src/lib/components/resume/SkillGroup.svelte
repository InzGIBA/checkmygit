<script lang="ts">
	import type { Skill } from '$lib/types/resume';

	interface Props {
		skill: Skill;
	}

	let { skill }: Props = $props();
</script>

<div
	class="group rounded-lg border border-border-default bg-bg-secondary p-4 transition-all hover:border-border-subtle hover:bg-bg-tertiary"
>
	<div class="flex items-center justify-between">
		<h3 class="font-semibold text-text-primary">{skill.name || 'Skill'}</h3>
		{#if skill.level}
			<span
				class="rounded-full bg-accent-green/10 px-2.5 py-1 text-xs font-medium text-accent-green"
			>
				{skill.level}
			</span>
		{/if}
	</div>

	{#if skill.keywords && skill.keywords.length > 0}
		<div class="mt-3 flex flex-wrap gap-2">
			{#each skill.keywords as keyword (keyword)}
				<span
					class="rounded-md bg-bg-tertiary px-2.5 py-1 text-xs text-text-secondary transition-colors hover:bg-accent-green/10 hover:text-accent-green"
				>
					{keyword}
				</span>
			{/each}
		</div>
	{/if}
</div>
