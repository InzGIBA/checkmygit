/**
 * Vite Plugin for Sitemap Generation
 * 
 * This plugin generates a sitemap.xml file after the build completes.
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import type { Plugin } from 'vite';
import { generateSitemap } from './generateSitemap.js';

interface SitemapPluginOptions {
  basePath: string;
  customDomain: string;
  username: string;
  enabled: boolean;
}

/**
 * Vite plugin to generate sitemap.xml during build
 */
export function sitemapPlugin(options: SitemapPluginOptions): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    
    // Run after the build is complete
    closeBundle() {
      if (!options.enabled) {
        console.log('Sitemap generation is disabled');
        return;
      }
      
      try {
        console.log('Generating sitemap.xml...');
        
        const sitemapContent = generateSitemap({
          basePath: options.basePath,
          customDomain: options.customDomain,
          username: options.username
        });
        
        // Write sitemap to build directory
        const outputPath = join(process.cwd(), 'build', 'sitemap.xml');
        writeFileSync(outputPath, sitemapContent, 'utf-8');
        
        console.log(`✓ Sitemap generated at: ${outputPath}`);
      } catch (error) {
        console.error('Failed to generate sitemap:', error);
        // Don't fail the build if sitemap generation fails
      }
    }
  };
}
