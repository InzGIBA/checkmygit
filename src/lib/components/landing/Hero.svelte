<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { validateGitHubUsername } from '$lib/types/portfolio';
	import { formatNumber } from '$lib/utils/github-transform';
	import { navigationState } from '$lib/stores/navigation.svelte';

	interface Props {
		totalPortfolios?: number;
	}

	let { totalPortfolios = 0 }: Props = $props();
	
	let username = $state('');
	let error = $state('');

	// Derive loading from navigation state
	let isLoading = $derived(navigationState.isLoading);

	async function handleSubmit() {
		const validation = validateGitHubUsername(username);
		if (!validation.valid) {
			error = validation.errors[0];
			return;
		}
		error = '';
		await navigationState.navigateToProfile(username.trim());
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	}

	function setUsername(name: string) {
		username = name;
	}
</script>

<section class="relative z-10 flex flex-col items-center justify-center px-6 pb-20 pt-32 text-center md:pb-32 md:pt-40">
	<div class="animate-fade-in relative z-10 max-w-4xl">
		<!-- Badge -->
		{#if totalPortfolios > 0}
			<div class="animate-fade-in-delay-1 mb-8 inline-flex items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] shadow-sm backdrop-blur-sm">
				<span class="mr-2 h-2 w-2 rounded-full bg-[var(--color-accent-green)] shadow-[0_0_8px_var(--color-accent-green)]"></span>
				<span class="mr-1 font-semibold text-[var(--color-text-primary)]">{formatNumber(totalPortfolios)}</span>
				portfolios generated
			</div>
		{/if}

		<h1 class="mb-6 text-5xl font-abril tracking-tight md:text-7xl">
			Transform your GitHub
			<br />
			<span class="text-gradient font-abril">into a portfolio</span>
		</h1>

		<p class="mx-auto mb-10 w-full max-w-[600px] text-lg text-[var(--color-text-secondary)] md:text-xl">
			Generate beautiful, shareable portfolio pages from any GitHub profile. Showcase your contributions, projects, and skills in seconds.
		</p>

		<!-- Input Container -->
		<div class="glass-panel mx-auto flex w-full max-w-[520px] items-center gap-2 rounded-2xl p-2 transition-all focus-within:ring-2 focus-within:ring-[var(--color-saas-green)]">
			<div class="relative flex flex-1 items-center px-3">
				<svg class="h-5 w-5 text-[var(--color-text-tertiary)]" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				<input
					type="text"
					placeholder="github-username"
					bind:value={username}
					onkeydown={handleKeydown}
					class="w-full border-none bg-transparent p-2 text-base text-[var(--color-text-primary)] placeholder-[var(--color-text-placeholder)] !outline-none !ring-0 focus:!border-none focus:!outline-none focus:!ring-0 focus-visible:!border-none focus-visible:!outline-none focus-visible:!ring-0"
					spellcheck="false"
				/>
			</div>
			<Button variant="primary" size="md" onclick={handleSubmit} loading={isLoading} class="h-10 rounded-xl px-6 font-semibold shadow-lg shadow-[var(--color-accent-green)/20]">
				Generate
			</Button>
		</div>

		{#if error}
			<p class="mt-4 text-sm font-medium text-[var(--color-accent-red)] animate-fade-in">{error}</p>
		{/if}

		<p class="animate-fade-in-delay-1 mt-6 text-sm text-[var(--color-text-tertiary)]">
			Try specific profiles:
			<button type="button" onclick={() => setUsername('torvalds')} class="ml-1 cursor-pointer font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-green)]">torvalds</button>,
			<button type="button" onclick={() => setUsername('rich-harris')} class="cursor-pointer font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-green)]">rich-harris</button>,
			<button type="button" onclick={() => setUsername('whoisyurii')} class="cursor-pointer font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-green)]">whoisyurii</button>
		</p>
	</div>
</section>
