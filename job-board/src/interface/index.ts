// User type for authentication
export type User = {
	userId: number;
	username: string;
	password?: string;
	role: string;
};

// AuthContext type
export type AuthContextType = {
	user: User | null;
	isAuthenticated: boolean;
	loading: boolean;
	login: (username: string, password: string) => boolean;
	logout: () => void;
};

// Profile type for user profile
export type Profile = {
	avatarUrl: string;
	name: string;
	username: string;
	role: string;
	bio: string;
	email?: string;
	phone?: string;
};

// Props for ProfileEditableFields
export interface ProfileEditableFieldsProps {
	profile: Profile;
}

// Job Application History type
export type JobApplication = {
    applicationId: number;
    jobTitle: string;
    jobId: number;
    status: 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';
    appliedAt: string; // ISO date string
};