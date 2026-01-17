<script lang="ts">
	interface Props {
		telegramUsername: string;
		class?: string;
	}

	let { telegramUsername, class: className = '' }: Props = $props();

	// Normalize username: remove @ if present
	const normalizedUsername = $derived(() => {
		if (!telegramUsername) return '';
		return telegramUsername.replace(/^@/, '');
	});

	const telegramUrl = $derived(() => {
		return `https://t.me/${normalizedUsername()}`;
	});
</script>

<a
	href={telegramUrl()}
	target="_blank"
	rel="noopener noreferrer"
	data-sveltekit-preload-data="off"
	class="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-btn-secondary-bg)] px-4 py-2 text-sm font-medium text-[var(--color-btn-secondary-text)] transition-colors hover:border-[var(--color-border-muted)] hover:bg-[var(--color-btn-secondary-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-saas-green)] focus-visible:ring-offset-2 focus-visible:outline-none {className}"
>
	<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
		<path
			d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.093.036.306.02.472z"
		/>
	</svg>
	Contact on Telegram
</a>
