<script lang="ts">
	import type { Volunteer } from '$lib/types/resume';
	import VolunteerItem from '$lib/components/resume/VolunteerItem.svelte';

	interface Props {
		volunteer: Volunteer[];
		class?: string;
	}

	let { volunteer, class: className = '' }: Props = $props();
</script>

{#if volunteer && volunteer.length > 0}
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
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
			<h3 class="text-lg font-semibold text-text-primary">Volunteer Experience</h3>
		</div>
		<div class="space-y-4">
			{#each volunteer as vol}
				<VolunteerItem volunteer={vol} />
			{/each}
		</div>
	</section>
{/if}
