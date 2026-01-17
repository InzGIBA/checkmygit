<script lang="ts">
	import type { GitHubProfile } from '$lib/types/github';
	import { formatJoinDate, generateProfileTags } from '$lib/utils/github-transform';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();

	const tags = $derived(generateProfileTags(profile));
	const joinDate = $derived(formatJoinDate(profile.user.createdAt));
</script>

<aside
	class="flex flex-col items-center gap-4 text-center lg:max-h-[calc(100vh-4rem)] lg:items-start lg:overflow-y-auto lg:pr-2 lg:text-left {className}"
	style="scrollbar-width: thin;"
>
	<!-- Avatar -->
	<div class="relative">
		<img
			src={profile.user.avatarUrl}
			alt={profile.user.login}
			class="h-74 w-74 rounded-full border-4 border-border-default bg-bg-tertiary"
		/>
	</div>

	<!-- Name & Username -->
	<div class="space-y-1">
		{#if profile.user.name}
			<h1 class="text-2xl font-semibold text-text-primary">
				{profile.user.name}
			</h1>
		{/if}
		<p class="text-xl text-text-secondary">
			@{profile.user.login}
		</p>
	</div>

	<!-- Bio -->
	{#if profile.user.bio}
		<p class="text-text-secondary">
			{profile.user.bio}
		</p>
	{/if}

	<!-- Follow Button -->
	<Button
		variant="secondary"
		size="md"
		href="https://github.com/{profile.user.login}"
		class="w-full"
	>
		<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
			<path
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
			/>
		</svg>
		Follow on GitHub
	</Button>

	<!-- Tags -->
	{#if tags.length > 0}
		<div class="flex flex-wrap justify-center gap-2 lg:justify-start">
			{#each tags as tag (tag)}
				<span class="shrink-0"><Badge variant="outline" size="sm">{tag}</Badge></span>
			{/each}
		</div>
	{/if}

	<!-- Section 1: Location & Registration -->
	<div class="space-y-2 text-sm text-text-secondary">
		{#if profile.user.location}
			<div class="flex items-center justify-center gap-2 lg:justify-start">
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span>{profile.user.location}</span>
			</div>
		{/if}

		<div class="flex items-center justify-center gap-2 lg:justify-start">
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<span>{joinDate}</span>
		</div>
	</div>

	<!-- Section 2: Contact Methods -->
	{#if profile.user.company || profile.user.websiteUrl || profile.user.twitterUsername || profile.user.linkedinUsername || profile.user.telegramUsername}
		<div class="space-y-2 text-sm text-text-secondary">
			{#if profile.user.company}
				<div class="flex items-center justify-center gap-2 lg:justify-start">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
					<span>{profile.user.company.replace('@', '')}</span>
				</div>
			{/if}

			{#if profile.user.websiteUrl}
				<div class="flex items-center justify-center gap-2 lg:justify-start">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
						/>
					</svg>
					<a
						href={profile.user.websiteUrl.startsWith('http')
							? profile.user.websiteUrl
							: `https://${profile.user.websiteUrl}`}
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="text-accent-green hover:underline"
					>
						{profile.user.websiteUrl.replace(/^https?:\/\//, '')}
					</a>
				</div>
			{/if}

			{#if profile.user.twitterUsername}
				<div class="flex items-center justify-center gap-2 lg:justify-start">
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
					<a
						href="https://twitter.com/{profile.user.twitterUsername}"
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="text-accent-green hover:underline"
					>
						@{profile.user.twitterUsername}
					</a>
				</div>
			{/if}

			{#if profile.user.linkedinUsername}
				<div class="flex items-center justify-center gap-2 lg:justify-start">
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
					<a
						href="https://www.linkedin.com/in/{profile.user.linkedinUsername}"
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="text-accent-green hover:underline"
					>
						LinkedIn
					</a>
				</div>
			{/if}

			{#if profile.user.telegramUsername}
				<div class="flex items-center justify-center gap-2 lg:justify-start">
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.093.036.306.02.472z"
						/>
					</svg>
					<a
						href="https://t.me/{profile.user.telegramUsername.replace(/^@/, '')}"
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="text-accent-green hover:underline"
					>
						Telegram
					</a>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Section 3: Social Stats -->
	<div class="flex items-center justify-center gap-4 text-sm lg:justify-start">
		<a
			href="https://github.com/{profile.user.login}?tab=followers"
			target="_blank"
			rel="noopener noreferrer"
			data-sveltekit-preload-data="off"
			class="flex items-center gap-2 text-text-secondary hover:text-accent-green"
		>
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
				<path
					d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
				/>
			</svg>
			<span
				><span class="font-semibold text-text-primary">{profile.stats.followers}</span> followers</span
			>
		</a>
		<span class="text-text-tertiary">·</span>
		<a
			href="https://github.com/{profile.user.login}?tab=following"
			target="_blank"
			rel="noopener noreferrer"
			data-sveltekit-preload-data="off"
			class="flex items-center gap-2 text-text-secondary hover:text-accent-green"
		>
			<span
				><span class="font-semibold text-text-primary">{profile.stats.following}</span> following</span
			>
		</a>
	</div>
</aside>
