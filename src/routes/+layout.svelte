<script lang="ts">
	import './layout.css';
	import { toastState } from '$lib/stores/generator.svelte';
	import { navigationState } from '$lib/stores/navigation.svelte';
	import { themeState } from '$lib/stores/theme.svelte';
	import Toast from '$lib/components/ui/Toast.svelte';
	import LoadingTransition from '$lib/components/ui/LoadingTransition.svelte';

	let { children } = $props();

	// Check if we're in exiting phase
	let isExiting = $derived(navigationState.phase === 'exiting');

	// Initialize theme on mount
	$effect(() => {
		themeState.init();
	});
</script>

<svelte:head>
	<title>CheckMyGit - GitHub Portfolio Generator</title>
	<meta name="description" content="Generate beautiful portfolio pages from your GitHub profile. Showcase your projects, contributions, and skills." />
	<meta name="theme-color" content={themeState.isDark ? '#030303' : '#FFFFFF'} />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</svelte:head>

<div class="min-h-screen bg-bg-primary" class:page-exit={isExiting}>
	{@render children()}
</div>

<!-- Loading Transition Overlay -->
<LoadingTransition />

<!-- Toast Container -->
{#if toastState.toasts.length > 0}
	<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
		{#each toastState.toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				message={toast.message}
				onclose={() => toastState.remove(toast.id)}
			/>
		{/each}
	</div>
{/if}
