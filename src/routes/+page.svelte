<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import ScreenshotShowcase from '$lib/components/landing/ScreenshotShowcase.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import FeaturedProfiles from '$lib/components/landing/FeaturedProfiles.svelte';
	import CallToAction from '$lib/components/landing/CallToAction.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>CheckMyGit - Your GitHub story, beautifully told</title>
	<meta name="description" content="Transform any GitHub profile into a stunning portfolio." />
</svelte:head>

<Header />

<main class="relative min-h-screen w-full overflow-hidden">
	<!-- SaaS Glow -->
	<div class="saas-glow"></div>
	<!-- Background grid effect -->
	<div class="absolute inset-0 z-0 grid-bg"></div>
	
	<Hero totalPortfolios={data.totalPortfolios} />
	<ScreenshotShowcase />
	<Features />
	<FeaturedProfiles />
	<CallToAction />
</main>

<Footer />
