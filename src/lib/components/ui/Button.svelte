<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		href?: string;
		target?: string;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		href,
		target,
		type = 'button',
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const baseClasses =
		'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

	const variantClasses = {
		primary:
			'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-btn-primary-hover)] focus-visible:ring-[var(--color-saas-green)]',
		secondary:
			'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)] border border-[var(--color-border-default)] hover:bg-[var(--color-btn-secondary-hover)] hover:border-[var(--color-border-muted)] focus-visible:ring-[var(--color-saas-green)]',
		ghost:
			'text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] focus-visible:ring-[var(--color-saas-green)]',
		danger:
			'bg-[var(--color-accent-red)] text-white hover:bg-red-600 focus-visible:ring-[var(--color-accent-red)]'
	};

	const sizeClasses = {
		sm: 'h-8 px-3 text-sm rounded-[var(--radius-md)] gap-1.5',
		md: 'h-10 px-4 text-sm rounded-[var(--radius-md)] gap-2',
		lg: 'h-12 px-5 text-base rounded-[var(--radius-lg)] gap-2'
	};

	const classes = $derived(
		`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
	);
</script>

{#if href}
	<a
		{href}
		{target}
		class={classes}
		class:opacity-50={disabled}
		rel={target === '_blank' ? 'noopener noreferrer' : undefined}
		data-sveltekit-preload-data="off"
	>
		{#if loading}
			<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{/if}
		{@render children()}
	</a>
{:else}
	<button {type} class={classes} disabled={disabled || loading} {onclick}>
		{#if loading}
			<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{/if}
		{@render children()}
	</button>
{/if}
