// KV optimization module for view counting
// Provides caching, deduplication, and 429 error handling

export { handleProfileView, getGlobalViewCount } from './view-counter';
export type { ProfileViewResult, ViewCountResult, CookieAccessor } from './types';
