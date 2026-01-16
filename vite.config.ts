import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sitemapPlugin } from './src/lib/build/sitemapPlugin';
import siteConfig from './site.config';

export default defineConfig({ 
	plugins: [
		tailwindcss(), 
		sveltekit(),
		sitemapPlugin({
			basePath: siteConfig.basePath,
			customDomain: siteConfig.customDomain,
			username: siteConfig.username,
			enabled: siteConfig.build.generateSitemap
		})
	] 
});
