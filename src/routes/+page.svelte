<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import TemplateGitHub from '$lib/components/templates/TemplateGitHub.svelte';
	import TemplateBento from '$lib/components/templates/TemplateBento.svelte';
	import TemplateMinimal from '$lib/components/templates/TemplateMinimal.svelte';
	import siteConfig from '../../site.config';

	let { data } = $props();

	// Поддержка переключения шаблона через URL query параметр (только на клиенте)
	const urlTemplate = $derived(browser ? $page.url.searchParams.get('template') : null);
	const activeTemplate = $derived(urlTemplate || data.template);
</script>

<svelte:head>
	<title>{siteConfig.siteTitle} - {data.username}</title>
	<meta name="description" content={siteConfig.siteDescription} />
</svelte:head>

{#if activeTemplate === 'bento'}
	<TemplateBento profile={data.profile} />
{:else if activeTemplate === 'minimal'}
	<TemplateMinimal profile={data.profile} />
{:else}
	<TemplateGitHub profile={data.profile} />
{/if}
