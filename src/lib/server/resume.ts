import type { ResumeData } from '$lib/types/resume';

const FETCH_TIMEOUT = 5000; // 5 seconds

/**
 * Fetches and parses JSON Resume data from a given URL
 * @param url - The URL pointing to a JSON Resume file
 * @returns Parsed ResumeData or null if fetch/parse fails
 */
export async function fetchResumeData(url: string): Promise<ResumeData | null> {
	try {
		// Create abort controller for timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

		const response = await fetch(url, {
			signal: controller.signal,
			headers: {
				Accept: 'application/json',
				'User-Agent': 'CheckMyGit'
			}
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			console.error(`Failed to fetch JSON Resume: ${response.statusText}`);
			return null;
		}

		const data = (await response.json()) as ResumeData;

		// Validate that it's a valid JSON Resume (has at least one expected field)
		if (!isValidResumeData(data)) {
			console.error('Invalid JSON Resume format');
			return null;
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === 'AbortError') {
				console.error('JSON Resume fetch timed out');
			} else {
				console.error(`Error fetching JSON Resume: ${error.message}`);
			}
		}
		return null;
	}
}

/**
 * Validates that the data conforms to JSON Resume schema
 * @param data - The data to validate
 * @returns true if data has at least one expected JSON Resume field
 */
function isValidResumeData(data: unknown): data is ResumeData {
	if (!data || typeof data !== 'object') return false;

	const resume = data as Partial<ResumeData>;

	// Check if at least one expected field exists
	return !!(
		resume.basics ||
		resume.work ||
		resume.education ||
		resume.skills ||
		resume.projects ||
		resume.volunteer ||
		resume.awards ||
		resume.publications ||
		resume.languages ||
		resume.interests ||
		resume.references
	);
}
