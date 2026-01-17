<script lang="ts">
	/**
	 * TechStack Component
	 *
	 * Displays the top 8 most-used programming languages from the user's GitHub profile.
	 *
	 * This component receives full language statistics from the backend (all languages analyzed
	 * across all repositories) and displays only the top 8 by usage size. The backend's
	 * calculateLanguageStats() function analyzes all repositories without limitation and returns
	 * a complete sorted list. This component then takes the first 8 entries for display.
	 *
	 * Key behaviors:
	 * - Displays top-8 languages by size (number of repositories)
	 * - If fewer than 8 languages exist, displays all available languages
	 * - Each language badge shows the language name with its associated color
	 * - Colors are provided by the backend from GitHub's language color scheme
	 *
	 * @prop {LanguageStats[]} languages - Complete array of language statistics from backend
	 * @prop {string | null} bio - Optional user bio to display above technologies
	 * @prop {string} class - Optional CSS classes for styling
	 */
	import type { LanguageStats } from '$lib/types/github';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		languages: LanguageStats[];
		bio?: string | null;
		class?: string;
	}

	let { languages, bio, class: className = '' }: Props = $props();
</script>

<Card variant="default" padding="md" class={className}>
	{#if bio}
		<div class="mb-4">
			<p class="text-sm leading-relaxed text-text-secondary">
				{bio}
			</p>
		</div>
	{/if}

	<div class="space-y-4">
		<h3 class="text-xs font-semibold tracking-wider text-text-tertiary uppercase">
			Core Technologies
		</h3>
		<!-- 
			Display top-8 languages from full language statistics
			- Backend provides complete language statistics (all languages analyzed)
			- This component displays the top 8 most-used languages by size
			- If fewer than 8 languages exist, all available languages are shown
			- Each badge displays the language name with its associated color
			Requirements: 3.1, 3.2, 3.3
		-->
		<div class="flex flex-wrap gap-2">
			{#each languages.slice(0, 8) as lang (lang.name)}
				<Badge variant="outline" color={lang.color}>
					<span
						class="mr-1.5 inline-block h-2 w-2 rounded-full"
						style="background-color: {lang.color}"
					></span>
					{lang.name}
				</Badge>
			{/each}
		</div>
	</div>
</Card>
