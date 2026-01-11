import type { PageServerLoad } from './$types';
import { fetchGitHubProfile } from '$lib/server/github';
import { handleProfileView } from '$lib/server/kv';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, platform, cookies }) => {
	const { username } = params;

	// Fetch GitHub profile
	const result = await fetchGitHubProfile(username);

	if (!result.success) {
		if (result.error.type === 'NOT_FOUND') {
			error(404, {
				message: `User "${username}" not found on GitHub`
			});
		}
		if (result.error.type === 'RATE_LIMIT') {
			error(429, {
				message: 'GitHub API rate limit exceeded. Please try again later.'
			});
		}
		error(500, {
			message: result.error.message || 'Failed to fetch GitHub profile'
		});
	}

	// Handle view counting with deduplication, caching, and 429 fallback
	const viewResult = await handleProfileView({
		platform,
		username,
		cookies: {
			get: (name) => cookies.get(name),
			set: (name, value, opts) => cookies.set(name, value, opts)
		}
	});

	return {
		profile: result.data,
		username,
		views: viewResult.views
	};
};
