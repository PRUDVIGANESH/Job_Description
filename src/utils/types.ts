
export interface UserPreferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredMode: string[]; // 'Remote', 'Hybrid', 'Onsite'
    experienceLevel: string;
    skills: string[];
    minMatchScore: number;
}
