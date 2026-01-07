<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import TemplateGitHub from '$lib/components/templates/TemplateGitHub.svelte';
	import TemplateBento from '$lib/components/templates/TemplateBento.svelte';
	import TemplateMinimal from '$lib/components/templates/TemplateMinimal.svelte';
	import { generatorState, toastState } from '$lib/stores/generator.svelte';
	import { generateShareUrl } from '$lib/utils/github-transform';
	import type { TemplateType } from '$lib/types/portfolio';

	let { data } = $props();

	// Initialize template from URL params
	$effect(() => {
		const params = $page.url.searchParams;
		generatorState.loadFromParams(params);
	});

	// Handle template change
	function handleTemplateChange(template: TemplateType) {
		generatorState.setTemplate(template);
		// Update URL without navigation
		const params = generatorState.toParams();
		const newUrl = `/${data.username}${params.toString() ? `?${params}` : ''}`;
		goto(newUrl, { replaceState: true, noScroll: true });
	}

	// Handle export
	async function handleExport() {
		generatorState.isExporting = true;
		try {
			// Dynamic import for html-to-image
			const { toPng } = await import('html-to-image');
			const element = document.getElementById('portfolio-container');
			if (!element) throw new Error('Portfolio container not found');

			const dataUrl = await toPng(element, {
				backgroundColor: '#0d1117',
				pixelRatio: 2
			});

			// Download
			const link = document.createElement('a');
			link.download = `${data.username}-portfolio.png`;
			link.href = dataUrl;
			link.click();

			toastState.success('Portfolio exported successfully!');
		} catch (err) {
			console.error('Export failed:', err);
			toastState.error('Failed to export portfolio');
		} finally {
			generatorState.isExporting = false;
		}
	}

	// Handle share
	async function handleShare() {
		const url = generateShareUrl(data.username, {
			template: generatorState.template,
			theme: generatorState.theme
		});

		try {
			await navigator.clipboard.writeText(url);
			toastState.success('Link copied to clipboard!');
		} catch {
			// Fallback for browsers without clipboard API
			toastState.info(url);
		}
	}
</script>

<svelte:head>
	<title>{data.profile.user.name || data.username} - CheckMyGit</title>
	<meta name="description" content="GitHub portfolio for {data.profile.user.name || data.username}. {data.profile.user.bio || 'View their projects and contributions.'}" />
	<meta property="og:title" content="{data.profile.user.name || data.username} - CheckMyGit" />
	<meta property="og:description" content="{data.profile.user.bio || `GitHub portfolio for ${data.username}`}" />
	<meta property="og:image" content="{data.profile.user.avatarUrl}" />
	<meta property="og:type" content="profile" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Header
	username={data.username}
	template={generatorState.template}
	showControls={true}
	onTemplateChange={handleTemplateChange}
	onExport={handleExport}
	onShare={handleShare}
/>

<main id="portfolio-container" class="min-h-screen bg-[var(--color-bg-primary)]">
	{#if generatorState.template === 'github'}
		<TemplateGitHub profile={data.profile} views={data.views} />
	{:else if generatorState.template === 'bento'}
		<TemplateBento profile={data.profile} views={data.views} />
	{:else if generatorState.template === 'minimal'}
		<TemplateMinimal profile={data.profile} views={data.views} />
	{/if}
</main>

<Footer />
