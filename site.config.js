/**
 * Site Configuration
 * 
 * This file contains the configuration for the static GitHub Pages deployment.
 * Environment variables can override these default values.
 */

export default {
  // GitHub username для отображения (может быть переопределен через env)
  username: process.env.GITHUB_USERNAME || 'your-username',
  
  // Шаблон по умолчанию: 'github' | 'bento' | 'minimal'
  defaultTemplate: 'github',
  
  // Base URL для GitHub Pages (если репозиторий не username.github.io)
  basePath: process.env.BASE_PATH || '',
  
  // Custom domain (опционально)
  customDomain: process.env.CUSTOM_DOMAIN || '',
  
  // Метаданные сайта
  siteTitle: 'GitHub Portfolio',
  siteDescription: 'My GitHub Profile Portfolio',
  
  // Опции сборки
  build: {
    // Кэшировать данные GitHub во время сборки
    cacheGitHubData: true,
    // Генерировать sitemap
    generateSitemap: true
  }
};
