<script lang="ts">
	import { navigationState } from '$lib/stores/navigation.svelte';

	// Reactive phase for animations
	let showLoadingScreen = $derived(
		navigationState.phase === 'loading' || navigationState.phase === 'exiting'
	);
</script>

<!-- Loading screen that appears between page transitions -->
{#if showLoadingScreen}
	<div class="loading-screen">
		<div class="loading-content">
			<!-- Animated spinner -->
			<div class="spinner-container">
				<div class="spinner-ring spinner-ring-1"></div>
				<div class="spinner-ring spinner-ring-2"></div>
				<div class="spinner-ring spinner-ring-3"></div>
				<div class="spinner-core">
					<svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
						/>
					</svg>
				</div>
			</div>

			<!-- Loading text -->
			<div class="loading-text">
				<h2 class="loading-title">Generating awesome profile for:</h2>
				<p class="loading-subtitle">
					{#if navigationState.targetUsername}
						@{navigationState.targetUsername}
					{/if}
				</p>
			</div>

			<!-- Progress bar -->
			<div class="progress-container">
				<div class="progress-bar"></div>
			</div>
		</div>
	</div>
{/if}

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background-color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		animation: contentFadeIn 0.5s ease 0.2s forwards;
		opacity: 0;
	}

	@keyframes contentFadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Spinner */
	.spinner-container {
		position: relative;
		width: 100px;
		height: 100px;
	}

	.spinner-ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 2px solid transparent;
	}

	.spinner-ring-1 {
		border-top-color: var(--color-accent-green);
		animation: spin 1.5s linear infinite;
	}

	.spinner-ring-2 {
		inset: 8px;
		border-right-color: #0d5a30;
		animation: spin 2s linear infinite reverse;
	}

	.spinner-ring-3 {
		inset: 16px;
		border-bottom-color: var(--color-saas-green);
		animation: spin 2.5s linear infinite;
	}

	.spinner-core {
		position: absolute;
		inset: 24px;
		background: rgba(22, 22, 22, 0.9);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.github-icon {
		width: 28px;
		height: 28px;
		color: var(--color-text-secondary);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	/* Loading Text */
	.loading-text {
		text-align: center;
	}

	.loading-title {
		font-family: var(--font-abril);
		font-size: 1.75rem;
		color: var(--color-text-primary);
		margin: 0 0 0.5rem 0;
	}

	.loading-subtitle {
		font-size: 1rem;
		color: var(--color-accent-green);
		margin: 0;
		font-family: var(--font-mono);
	}

	/* Progress Bar */
	.progress-container {
		width: 200px;
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--color-saas-green), var(--color-accent-green));
		border-radius: 4px;
		animation: progress 2s ease-in-out infinite;
	}

	@keyframes progress {
		0% {
			width: 0%;
			margin-left: 0%;
		}
		50% {
			width: 60%;
			margin-left: 20%;
		}
		100% {
			width: 0%;
			margin-left: 100%;
		}
	}

	/* Responsive */
	@media (max-width: 640px) {
		.loading-title {
			font-size: 1.25rem;
		}

		.spinner-container {
			width: 80px;
			height: 80px;
		}

		.spinner-core {
			inset: 18px;
		}

		.github-icon {
			width: 24px;
			height: 24px;
		}
	}
</style>
