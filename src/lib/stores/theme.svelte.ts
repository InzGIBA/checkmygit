// Theme state management using Svelte 5 runes
// Supports localStorage persistence and system preference detection

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

class ThemeState {
	current = $state<Theme>('dark');
	#initialized = false;

	constructor() {
		// Initialization happens in init() to avoid SSR issues
	}

	init() {
		if (this.#initialized || typeof window === 'undefined') return;
		this.#initialized = true;

		// Check localStorage first
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored === 'dark' || stored === 'light') {
			this.current = stored;
		} else {
			// Fall back to system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.current = prefersDark ? 'dark' : 'light';
		}

		// Listen for system preference changes (only if no stored preference)
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (!localStorage.getItem(STORAGE_KEY)) {
				this.current = e.matches ? 'dark' : 'light';
				this.#applyTheme();
			}
		});

		this.#applyTheme();
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		localStorage.setItem(STORAGE_KEY, this.current);
		this.#applyTheme();
	}

	setTheme(theme: Theme) {
		this.current = theme;
		localStorage.setItem(STORAGE_KEY, theme);
		this.#applyTheme();
	}

	#applyTheme() {
		if (typeof document === 'undefined') return;

		const root = document.documentElement;
		if (this.current === 'light') {
			root.classList.add('light');
		} else {
			root.classList.remove('light');
		}
	}

	get isDark() {
		return this.current === 'dark';
	}

	get isLight() {
		return this.current === 'light';
	}
}

export const themeState = new ThemeState();
