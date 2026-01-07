<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
	<title>Dashboard - CheckMyGit</title>
</svelte:head>

<Header />

<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="text-2xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
	<p class="mt-2 text-[var(--color-text-secondary)]">
		Manage your saved portfolios and settings
	</p>

	<Card variant="default" padding="lg" class="mt-8 text-center">
		<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)]">
			<svg class="h-8 w-8 text-[var(--color-text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
			</svg>
		</div>
		<h2 class="text-xl font-semibold text-[var(--color-text-primary)]">
			Coming Soon
		</h2>
		<p class="mt-2 text-[var(--color-text-secondary)]">
			Dashboard features are under development. For now, simply share your portfolio URL directly!
		</p>
		<div class="mt-6">
			<Button variant="primary" href="/">
				Generate Portfolio
			</Button>
		</div>
		<p class="mt-4 text-xs text-[var(--color-text-tertiary)]">
			Your portfolio link format: checkmygit.dev/username
		</p>
	</Card>
</main>

<Footer />
