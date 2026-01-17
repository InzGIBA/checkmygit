<script lang="ts">
	import type { GitHubProfile } from '$lib/types/github';
	import Badge from '$lib/components/ui/Badge.svelte';
	import LinkedInButton from '$lib/components/ui/LinkedInButton.svelte';
	import TelegramButton from '$lib/components/ui/TelegramButton.svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();
</script>

<div class="flex items-center gap-6 {className}">
	<!-- Avatar -->
	<img
		src={profile.user.avatarUrl}
		alt={profile.user.login}
		class="h-24 w-24 rounded-full border-2 border-border-default bg-bg-tertiary"
	/>

	<!-- Info -->
	<div class="flex-1">
		<div class="flex items-center gap-3">
			<h1 class="text-2xl font-bold text-text-primary">
				{profile.user.name || profile.user.login}
			</h1>
			{#if profile.user.name}
				<span class="text-lg text-text-secondary">
					@{profile.user.login}
				</span>
			{/if}
		</div>

		{#if profile.user.bio}
			<p class="mt-2 text-text-secondary">
				{profile.user.bio}
			</p>
		{/if}

		<!-- Quick stats -->
		<div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
			{#if profile.user.location}
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
					</svg>
					<span>{profile.user.location}</span>
				</div>
			{/if}
			{#if profile.user.company}
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
						/>
					</svg>
					<span>{profile.user.company.replace('@', '')}</span>
				</div>
			{/if}
			<Badge variant="outline" size="sm">
				{profile.stats.yearsActive}
				{profile.stats.yearsActive === 1 ? 'year' : 'years'} on GitHub
			</Badge>
		</div>

		<!-- Social Links -->
		{#if profile.user.websiteUrl || profile.user.twitterUsername || profile.user.linkedinUsername || profile.user.telegramUsername}
			<div class="mt-3 flex flex-wrap gap-2">
				{#if profile.user.websiteUrl}
					<a
						href={profile.user.websiteUrl.startsWith('http')
							? profile.user.websiteUrl
							: `https://${profile.user.websiteUrl}`}
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="border-border-primary inline-flex items-center gap-2 rounded-lg border bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-tertiary"
					>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
							/>
						</svg>
						Website
					</a>
				{/if}
				{#if profile.user.twitterUsername}
					<a
						href="https://twitter.com/{profile.user.twitterUsername}"
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="border-border-primary inline-flex items-center gap-2 rounded-lg border bg-bg-secondary px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-tertiary"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
						Twitter
					</a>
				{/if}
				{#if profile.user.linkedinUsername}
					<LinkedInButton linkedinUsername={profile.user.linkedinUsername} />
				{/if}
				{#if profile.user.telegramUsername}
					<TelegramButton telegramUsername={profile.user.telegramUsername} />
				{/if}
			</div>
		{/if}
	</div>
</div>
