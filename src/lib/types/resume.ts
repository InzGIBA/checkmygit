// JSON Resume Schema v1.0.0
// https://jsonresume.org/schema/

export interface ResumeData {
	basics?: ResumeBasics;
	work?: WorkExperience[];
	education?: Education[];
	skills?: Skill[];
	projects?: Project[];
	volunteer?: Volunteer[];
	awards?: Award[];
	publications?: Publication[];
	languages?: Language[];
	interests?: Interest[];
	references?: Reference[];
}

export interface ResumeBasics {
	name?: string;
	label?: string;
	image?: string;
	email?: string;
	phone?: string;
	url?: string;
	summary?: string;
	location?: {
		address?: string;
		postalCode?: string;
		city?: string;
		countryCode?: string;
		region?: string;
	};
	profiles?: {
		network?: string;
		username?: string;
		url?: string;
	}[];
}

export interface WorkExperience {
	name?: string; // Company name
	position?: string;
	url?: string;
	startDate?: string; // ISO 8601 date
	endDate?: string; // ISO 8601 date or empty for current
	summary?: string;
	highlights?: string[];
}

export interface Education {
	institution?: string;
	url?: string;
	area?: string; // Field of study
	studyType?: string; // Degree type (Bachelor, Master, etc.)
	startDate?: string;
	endDate?: string;
	score?: string; // GPA or grade
	courses?: string[];
}

export interface Skill {
	name?: string;
	level?: string; // Beginner, Intermediate, Advanced, Expert
	keywords?: string[];
}

export interface Project {
	name?: string;
	description?: string;
	highlights?: string[];
	keywords?: string[];
	startDate?: string;
	endDate?: string;
	url?: string;
	roles?: string[];
	entity?: string; // Organization or company
	type?: string; // application, library, etc.
}

export interface Volunteer {
	organization?: string;
	position?: string;
	url?: string;
	startDate?: string;
	endDate?: string;
	summary?: string;
	highlights?: string[];
}

export interface Award {
	title?: string;
	date?: string;
	awarder?: string;
	summary?: string;
}

export interface Publication {
	name?: string;
	publisher?: string;
	releaseDate?: string;
	url?: string;
	summary?: string;
}

export interface Language {
	language?: string;
	fluency?: string; // Native, Fluent, Intermediate, Basic
}

export interface Interest {
	name?: string;
	keywords?: string[];
}

export interface Reference {
	name?: string;
	reference?: string;
}
