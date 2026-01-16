import { env } from '$env/dynamic/private';
import { fetchProfileDataAtBuildTime } from '$lib/build/fetchProfileData';
import siteConfig from '../../site.config';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	// Read username from environment variable, fallback to config
	const username = env.GITHUB_USERNAME || siteConfig.username;
	
	// Данные будут получены во время сборки и встроены в статический HTML
	const profile = await fetchProfileDataAtBuildTime(username);
	
	return {
		profile,
		username,
		template: siteConfig.defaultTemplate
	};
};
