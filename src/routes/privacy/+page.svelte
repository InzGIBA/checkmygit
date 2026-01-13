<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { REPO_URL } from '$lib/constants';
</script>

<svelte:head>
	<title>Privacy Policy - CheckMyGit</title>
	<meta
		name="description"
		content="Privacy policy for CheckMyGit - learn how we handle your data and protect your privacy."
	/>
</svelte:head>

<Header />

<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<article class="space-y-10">
		<!-- Header -->
		<header class="border-b border-border-default pb-8">
			<h1 class="text-3xl font-bold text-text-primary sm:text-4xl">Privacy Policy</h1>
			<p class="mt-4 text-text-secondary">Last updated: January 2026</p>
		</header>

		<!-- Introduction -->
		<section class="space-y-4">
			<p class="leading-relaxed text-text-secondary">
				At CheckMyGit, we take your privacy seriously. This policy explains what information
				we collect, how we use it, and your rights regarding your data.
			</p>
		</section>

		<!-- Information We Collect -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">Information We Collect</h2>
			<p class="leading-relaxed text-text-secondary">
				CheckMyGit only accesses <span class="text-text-primary">publicly available</span> information
				from GitHub. We do not require you to create an account or provide any personal information.
			</p>
			<p class="leading-relaxed text-text-secondary">
				When you generate a portfolio, we fetch the following public data from GitHub's API:
			</p>
			<ul class="ml-4 list-inside list-disc space-y-2 text-text-secondary">
				<li>Public profile information (username, name, bio, avatar, location)</li>
				<li>Public repository data (names, descriptions, stars, languages)</li>
				<li>Public contribution statistics</li>
				<li>Follower and following counts</li>
			</ul>
			<p class="leading-relaxed text-text-secondary">
				We may also collect anonymous usage analytics to improve our service, including page
				views and feature usage patterns. This data is not linked to any individual user.
			</p>
		</section>

		<!-- How We Use Information -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">How We Use Information</h2>
			<p class="leading-relaxed text-text-secondary">
				The GitHub data we fetch is used solely to generate and display portfolio pages.
				We use this information to:
			</p>
			<ul class="ml-4 list-inside list-disc space-y-2 text-text-secondary">
				<li>Display your public GitHub profile and repositories</li>
				<li>Generate contribution graphs and statistics</li>
				<li>Create shareable portfolio links</li>
				<li>Enable portfolio export as images</li>
			</ul>
		</section>

		<!-- Data Storage -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">Data Storage</h2>
			<p class="leading-relaxed text-text-secondary">
				CheckMyGit is hosted on Cloudflare Pages. We use Cloudflare's edge network for
				fast, global content delivery.
			</p>
			<p class="leading-relaxed text-text-secondary">
				We may temporarily cache GitHub API responses to improve performance and reduce
				API rate limits. Cached data is automatically refreshed periodically and does
				not persist indefinitely.
			</p>
			<p class="leading-relaxed text-text-secondary">
				We store anonymous view counts for portfolio pages to display visit statistics.
				This data is stored in Cloudflare KV and contains no personally identifiable
				information.
			</p>
		</section>

		<!-- Third-Party Services -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">Third-Party Services</h2>
			<p class="leading-relaxed text-text-secondary">
				CheckMyGit integrates with the following third-party services:
			</p>
			<ul class="ml-4 list-inside list-disc space-y-2 text-text-secondary">
				<li>
					<span class="text-text-primary">GitHub API</span> - To fetch public profile and
					repository data
				</li>
				<li>
					<span class="text-text-primary">Cloudflare</span> - For hosting, CDN, and data storage
				</li>
				<li>
					<span class="text-text-primary">Google Fonts</span> - For typography (Inter font family)
				</li>
			</ul>
			<p class="leading-relaxed text-text-secondary">
				Each of these services has their own privacy policies. We encourage you to review
				them if you have concerns.
			</p>
		</section>

		<!-- Cookies -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">Cookies</h2>
			<p class="leading-relaxed text-text-secondary">
				CheckMyGit does not use cookies for tracking purposes. Any cookies present are
				essential for the service to function (such as Cloudflare security cookies) or
				for storing your template preferences locally.
			</p>
		</section>

		<!-- Your Rights -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">Your Rights</h2>
			<p class="leading-relaxed text-text-secondary">
				Since we only display publicly available GitHub data, you have full control over
				what information appears on CheckMyGit:
			</p>
			<ul class="ml-4 list-inside list-disc space-y-2 text-text-secondary">
				<li>Update your GitHub profile to change what's displayed</li>
				<li>Make repositories private to exclude them from your portfolio</li>
				<li>Adjust your GitHub privacy settings at any time</li>
			</ul>
			<p class="leading-relaxed text-text-secondary">
				If you have concerns about your data or would like us to exclude your profile from
				our service, please open an issue on our GitHub repository.
			</p>
		</section>

		<!-- Changes to This Policy -->
		<section class="space-y-4">
			<h2 class="text-xl font-semibold text-text-primary">Changes to This Policy</h2>
			<p class="leading-relaxed text-text-secondary">
				We may update this privacy policy from time to time. Any changes will be reflected
				on this page with an updated revision date. We encourage you to review this policy
				periodically.
			</p>
		</section>

		<!-- Contact -->
		<section class="space-y-4 border-t border-border-default pt-8">
			<h2 class="text-xl font-semibold text-text-primary">Contact</h2>
			<p class="leading-relaxed text-text-secondary">
				If you have questions about this privacy policy or our data practices, please open
				an issue on our GitHub repository.
			</p>
			<a
				href={REPO_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-accent-blue transition-colors hover:underline"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
					/>
				</svg>
				Open an issue on GitHub
			</a>
		</section>
	</article>
</main>

<Footer />
