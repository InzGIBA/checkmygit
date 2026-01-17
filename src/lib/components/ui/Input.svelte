<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'text' | 'email' | 'password' | 'search' | 'url';
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		error?: string;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		id?: string;
		name?: string;
		required?: boolean;
		icon?: Snippet;
		onchange?: (e: Event) => void;
		oninput?: (e: Event) => void;
		onkeydown?: (e: KeyboardEvent) => void;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		error,
		size = 'md',
		class: className = '',
		id,
		name,
		required = false,
		icon,
		onchange,
		oninput,
		onkeydown
	}: Props = $props();

	const sizeClasses = {
		sm: 'h-8 text-sm px-3',
		md: 'h-10 text-sm px-4',
		lg: 'h-12 text-base px-4'
	};
</script>

<div class="relative {className}">
	{#if icon}
		<div
			class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-text-tertiary)]"
		>
			{@render icon()}
		</div>
	{/if}
	<input
		{type}
		{id}
		{name}
		{required}
		{disabled}
		{placeholder}
		bind:value
		{onchange}
		{oninput}
		{onkeydown}
		class="
			w-full rounded-[var(--radius-md)] border bg-[var(--color-bg-secondary)]
			text-[var(--color-text-primary)] placeholder-[var(--color-text-placeholder)]
			transition-colors
			focus:border-[var(--color-saas-green)] focus:ring-1 focus:ring-[var(--color-saas-green)] focus:outline-none
			disabled:cursor-not-allowed disabled:opacity-50
			{sizeClasses[size]}
			{icon ? 'pl-10' : ''}
			{error ? 'border-[var(--color-accent-red)]' : 'border-[var(--color-border-default)]'}
		"
	/>
	{#if error}
		<p class="mt-1 text-xs text-[var(--color-accent-red)]">{error}</p>
	{/if}
</div>
