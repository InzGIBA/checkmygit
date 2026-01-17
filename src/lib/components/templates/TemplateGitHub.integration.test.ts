import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TemplateGitHub from './TemplateGitHub.svelte';
import type { GitHubProfile } from '$lib/types/github';

// Helper to create a base profile
function createBaseProfile(overrides?: Partial<GitHubProfile>): GitHubProfile {
	return {
		user: {
			login: 'testuser',
			name: 'Test User',
			bio: 'Test bio',
			avatarUrl: 'https://example.com/avatar.jpg',
			location: 'Test City',
			company: 'Test Company',
			websiteUrl: 'https://example.com',
			twitterUsername: 'testuser',
			email: null,
			linkedinUsername: null,
			telegramUsername: null,
			followers: 100,
			following: 50,
			createdAt: '2020-01-01T00:00:00Z',
			updatedAt: '2024-01-01T00:00:00Z'
		},
		repositories: [],
		pinnedRepositories: [],
		contributions: null,
		languages: [],
		resumeData: null,
		stats: {
			totalRepos: 10,
			totalStars: 100,
			originalStars: 80,
			totalForks: 20,
			followers: 100,
			following: 50,
			yearsActive: 4
		},
		...overrides
	};
}

describe('TemplateGitHub Integration Tests', () => {
	describe('14.1 Test complete profile flow', () => {
		it('should render profile with all features enabled (Telegram + JSON Resume)', () => {
			const profile = createBaseProfile({
				user: {
					...createBaseProfile().user,
					telegramUsername: 'testuser',
					linkedinUsername: 'testuser'
				},
				resumeData: {
					work: [
						{
							name: 'Test Company',
							position: 'Software Engineer',
							startDate: '2020-01-01',
							endDate: '2024-01-01',
							summary: 'Test work summary',
							highlights: ['Achievement 1', 'Achievement 2']
						}
					],
					education: [
						{
							institution: 'Test University',
							area: 'Computer Science',
							studyType: 'Bachelor',
							startDate: '2016-01-01',
							endDate: '2020-01-01',
							score: '3.8'
						}
					],
					skills: [
						{
							name: 'Programming',
							level: 'Expert',
							keywords: ['JavaScript', 'TypeScript', 'Python']
						}
					],
					projects: [
						{
							name: 'Test Project',
							description: 'A test project',
							startDate: '2023-01-01',
							keywords: ['test', 'project']
						}
					],
					volunteer: [
						{
							organization: 'Test Org',
							position: 'Volunteer',
							startDate: '2022-01-01',
							summary: 'Volunteer work'
						}
					],
					awards: [
						{
							title: 'Test Award',
							date: '2023-01-01',
							awarder: 'Test Awarder'
						}
					],
					publications: [
						{
							name: 'Test Publication',
							publisher: 'Test Publisher',
							releaseDate: '2023-01-01'
						}
					]
				}
			});

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify copywriting updates
			expect(container.textContent).toContain("Welcome to Test User's Portfolio");
			expect(container.textContent).toContain('professional profile');
			expect(container.textContent).toContain('CheckMyGit');
			expect(container.textContent).toContain('JSON Resume');

			// Verify resume sections are displayed
			expect(container.textContent).toContain('Work Experience');
			expect(container.textContent).toContain('Education');
			expect(container.textContent).toContain('Skills');
			expect(container.textContent).toContain('Projects');
			expect(container.textContent).toContain('Volunteer Experience');
			expect(container.textContent).toContain('Awards & Certificates');
			expect(container.textContent).toContain('Publications');

			// Verify resume data is displayed
			expect(container.textContent).toContain('Test Company');
			expect(container.textContent).toContain('Software Engineer');
			expect(container.textContent).toContain('Test University');
			expect(container.textContent).toContain('Programming');
			expect(container.textContent).toContain('Test Project');
			expect(container.textContent).toContain('Test Org');
			expect(container.textContent).toContain('Test Award');
			expect(container.textContent).toContain('Test Publication');
		});

		it('should render profile with Telegram only', () => {
			const profile = createBaseProfile({
				user: {
					...createBaseProfile().user,
					telegramUsername: 'testuser'
				}
			});

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify Telegram link is present
			const telegramLink = container.querySelector('a[href="https://t.me/testuser"]');
			expect(telegramLink).toBeTruthy();

			// Verify resume sections are not displayed
			expect(container.textContent).not.toContain('Work Experience');
			expect(container.textContent).not.toContain('Education');
			expect(container.textContent).not.toContain('Skills');
		});

		it('should render profile with JSON Resume only', () => {
			const profile = createBaseProfile({
				resumeData: {
					work: [
						{
							name: 'Test Company',
							position: 'Software Engineer',
							startDate: '2020-01-01'
						}
					],
					education: [
						{
							institution: 'Test University',
							area: 'Computer Science',
							studyType: 'Bachelor'
						}
					],
					skills: [
						{
							name: 'Programming',
							keywords: ['JavaScript']
						}
					]
				}
			});

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify resume sections are displayed
			expect(container.textContent).toContain('Work Experience');
			expect(container.textContent).toContain('Education');
			expect(container.textContent).toContain('Skills');

			// Verify Telegram link is not present
			const telegramLink = container.querySelector('a[href*="t.me"]');
			expect(telegramLink).toBeFalsy();
		});

		it('should render profile with neither Telegram nor JSON Resume', () => {
			const profile = createBaseProfile();

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify basic profile information is displayed
			expect(container.textContent).toContain('Test User');
			expect(container.textContent).toContain('@testuser');

			// Verify Telegram link is not present
			const telegramLink = container.querySelector('a[href*="t.me"]');
			expect(telegramLink).toBeFalsy();

			// Verify resume sections are not displayed
			expect(container.textContent).not.toContain('Work Experience');
			expect(container.textContent).not.toContain('Education');
			expect(container.textContent).not.toContain('Skills');
		});

		it('should display all additional resume sections when data exists', () => {
			const profile = createBaseProfile({
				resumeData: {
					projects: [
						{
							name: 'Test Project',
							description: 'A test project'
						}
					],
					volunteer: [
						{
							organization: 'Test Org',
							position: 'Volunteer'
						}
					],
					awards: [
						{
							title: 'Test Award',
							awarder: 'Test Awarder'
						}
					],
					publications: [
						{
							name: 'Test Publication',
							publisher: 'Test Publisher'
						}
					]
				}
			});

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify all additional sections are displayed
			expect(container.textContent).toContain('Projects');
			expect(container.textContent).toContain('Test Project');
			expect(container.textContent).toContain('Volunteer Experience');
			expect(container.textContent).toContain('Test Org');
			expect(container.textContent).toContain('Awards & Certificates');
			expect(container.textContent).toContain('Test Award');
			expect(container.textContent).toContain('Publications');
			expect(container.textContent).toContain('Test Publication');
		});

		it('should gracefully degrade when resume data is null', () => {
			const profile = createBaseProfile({
				resumeData: null
			});

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify profile renders without errors
			expect(container.textContent).toContain('Test User');

			// Verify resume sections are not displayed
			expect(container.textContent).not.toContain('Work Experience');
			expect(container.textContent).not.toContain('Education');
			expect(container.textContent).not.toContain('Skills');
			expect(container.textContent).not.toContain('Projects');
			expect(container.textContent).not.toContain('Volunteer Experience');
			expect(container.textContent).not.toContain('Awards & Certificates');
			expect(container.textContent).not.toContain('Publications');
		});

		it('should gracefully degrade when resume data has empty arrays', () => {
			const profile = createBaseProfile({
				resumeData: {
					work: [],
					education: [],
					skills: [],
					projects: [],
					volunteer: [],
					awards: [],
					publications: []
				}
			});

			const { container } = render(TemplateGitHub, { props: { profile } });

			// Verify profile renders without errors
			expect(container.textContent).toContain('Test User');

			// Verify resume sections are not displayed when arrays are empty
			expect(container.textContent).not.toContain('Work Experience');
			expect(container.textContent).not.toContain('Education');
			expect(container.textContent).not.toContain('Skills');
			expect(container.textContent).not.toContain('Projects');
			expect(container.textContent).not.toContain('Volunteer Experience');
			expect(container.textContent).not.toContain('Awards & Certificates');
			expect(container.textContent).not.toContain('Publications');
		});
	});
});
