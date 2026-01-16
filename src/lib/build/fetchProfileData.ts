import { env } from '$env/dynamic/private';
import type { GitHubProfile } from '$lib/types/github';
import { fetchGitHubProfile } from '$lib/server/github';

/**
 * Fetches GitHub profile data at build time.
 * This function is designed to be called during the SvelteKit build process
 * to pre-render profile data into static HTML.
 * 
 * @param username - The GitHub username to fetch profile data for
 * @returns Promise resolving to the complete GitHub profile data
 * @throws Error if GITHUB_TOKEN is not set or if the API request fails
 */
export async function fetchProfileDataAtBuildTime(
	username: string
): Promise<GitHubProfile> {
	const GITHUB_TOKEN = env.GITHUB_TOKEN;

	// Check for required GITHUB_TOKEN
	if (!GITHUB_TOKEN) {
		throw new Error(
			'GITHUB_TOKEN environment variable is required for build-time data fetching. ' +
			'Please set it in your environment or GitHub Secrets. ' +
			'You can create a token at: https://github.com/settings/tokens'
		);
	}

	// Validate username
	if (!username || username.trim() === '') {
		throw new Error(
			'GitHub username is required for build-time data fetching. ' +
			'Please set GITHUB_USERNAME in your environment or site.config.js'
		);
	}

	// Fetch profile data using existing logic
	const result = await fetchGitHubProfile(username);

	// Handle API errors with informative messages
	if (!result.success) {
		const error = result.error;
		
		switch (error.type) {
			case 'NOT_FOUND':
				throw new Error(
					`Failed to fetch GitHub profile: User "${username}" not found. ` +
					'Please verify the username is correct.'
				);
			
			case 'RATE_LIMIT':
				throw new Error(
					'Failed to fetch GitHub profile: GitHub API rate limit exceeded. ' +
					'Please wait for the rate limit to reset or use a token with higher limits. ' +
					'Authenticated requests have a limit of 5,000 requests per hour.'
				);
			
			case 'UNAUTHORIZED':
				throw new Error(
					'Failed to fetch GitHub profile: Invalid or expired GitHub token. ' +
					'Please verify your GITHUB_TOKEN is correct and has the required permissions (read:user). ' +
					'You can create a new token at: https://github.com/settings/tokens'
				);
			
			case 'UNKNOWN':
			default:
				throw new Error(
					`Failed to fetch GitHub profile for "${username}": ${error.message}. ` +
					'Please check your network connection and try again.'
				);
		}
	}

	return result.data;
}
