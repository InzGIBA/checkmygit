import type { PageServerLoad } from './$types';
import { fetchTopRepositories, fetchTopUsers } from '$lib/server/rankings';
import type { RankedRepository, RankedUser } from '$lib/types/rankings';

export const load: PageServerLoad = async ({ url }) => {
	const tab = url.searchParams.get('tab') || 'repos';
	const language = url.searchParams.get('language') || '';

	// Fetch both repos and users in parallel for instant tab switching
	// Reduced user count (30) for faster loading while still allowing re-sorting
	const [reposResult, usersResult] = await Promise.all([
		fetchTopRepositories(language || undefined),
		fetchTopUsers('followers', 30)
	]);

	const repos: RankedRepository[] = reposResult.success ? reposResult.data : [];
	const users: RankedUser[] = usersResult.success ? usersResult.data : [];

	// Combine errors if any
	const errors: string[] = [];
	if (!reposResult.success && reposResult.error) errors.push(reposResult.error);
	if (!usersResult.success && usersResult.error) errors.push(usersResult.error);

	return {
		tab,
		language,
		repos,
		users,
		error: errors.length > 0 ? errors.join('; ') : undefined
	};
};
