<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Option {
		value: string;
		label: string;
		mobileLabel?: string;
		icon?: Snippet;
	}

	interface Props {
		options: Option[];
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		onchange?: (value: string) => void;
		trigger?: Snippet;
	}

	let {
		options,
		value = $bindable(''),
		placeholder = 'Select...',
		disabled = false,
		class: className = '',
		onchange,
		trigger
	}: Props = $props();

	let isOpen = $state(false);

	function selectOption(option: Option) {
		value = option.value;
		isOpen = false;
		onchange?.(option.value);
	}

	function handleKeydown(e: KeyboardEvent, option: Option) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			selectOption(option);
		}
	}

	const selectedOption = $derived(options.find((o) => o.value === value));
</script>

<div class="relative {className}">
	{#if trigger}
		<button type="button" class="w-full" onclick={() => !disabled && (isOpen = !isOpen)} {disabled}>
			{@render trigger()}
		</button>
	{:else}
		<button
			type="button"
			class="
				flex h-9 w-full items-center justify-between rounded-[var(--radius-md)]
				border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]
				px-3 text-sm text-[var(--color-text-primary)] transition-colors
				hover:bg-[var(--color-bg-tertiary)]
				focus:border-[var(--color-saas-green)] focus:ring-1 focus:ring-[var(--color-saas-green)] focus:outline-none
				disabled:cursor-not-allowed disabled:opacity-50
			"
			onclick={() => !disabled && (isOpen = !isOpen)}
			{disabled}
		>
			<span class={!selectedOption ? 'text-[var(--color-text-placeholder)]' : ''}>
				{#if selectedOption}
					<span class="sm:hidden">{selectedOption.mobileLabel || selectedOption.label}</span>
					<span class="hidden sm:inline">{selectedOption.label}</span>
				{:else}
					{placeholder}
				{/if}
			</span>
			<svg
				class="h-4 w-4 text-[var(--color-text-tertiary)] transition-transform {isOpen
					? 'rotate-180'
					: ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	{/if}

	{#if isOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-40"
			onclick={() => (isOpen = false)}
			onkeydown={(e) => e.key === 'Escape' && (isOpen = false)}
		></div>
		<div
			class="
				absolute right-0 z-50 mt-1 min-w-[180px] overflow-hidden rounded-[var(--radius-md)]
				border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]
				shadow-[var(--shadow-lg)]
			"
		>
			{#each options as option (option.value)}
				<div
					role="option"
					aria-selected={option.value === value}
					tabindex="0"
					class="
						flex cursor-pointer items-center gap-2 px-3 py-2 text-sm
						text-[var(--color-text-primary)] transition-colors
						hover:bg-[var(--color-bg-tertiary)]
						{option.value === value ? 'bg-[var(--color-bg-tertiary)]' : ''}
					"
					onclick={() => selectOption(option)}
					onkeydown={(e) => handleKeydown(e, option)}
				>
					{#if option.icon}
						{@render option.icon()}
					{/if}
					{option.label}
					{#if option.value === value}
						<svg
							class="ml-auto h-4 w-4 text-[var(--color-accent-green)]"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
