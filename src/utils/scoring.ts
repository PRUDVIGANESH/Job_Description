
import type { Job } from '../data/jobs';
import type { UserPreferences } from './types';

// Deterministic Match Scoring Logic
export const calculateMatchScore = (job: Job, prefs: UserPreferences): number => {
    let score = 0;

    // Rule 1: +25 if any roleKeyword appears in job.title (case-insensitive)
    const titleLower = job.title.toLowerCase();
    const hasTitleMatch = prefs.roleKeywords.some(keyword =>
        keyword.trim() && titleLower.includes(keyword.trim().toLowerCase())
    );
    if (hasTitleMatch) score += 25;

    // Rule 2: +15 if any roleKeyword appears in job.description (case-insensitive)
    const descLower = job.description.toLowerCase();
    const hasDescMatch = prefs.roleKeywords.some(keyword =>
        keyword.trim() && descLower.includes(keyword.trim().toLowerCase())
    );
    if (hasDescMatch) score += 15;

    // Rule 3: +15 if job.location matches preferredLocations
    // Check if job location is present in preferred locations list
    const hasLocationMatch = prefs.preferredLocations.some(loc =>
        loc.toLowerCase() === job.location.toLowerCase()
    );
    if (hasLocationMatch) score += 15;

    // Rule 4: +10 if job.mode matches preferredMode
    // Check if job mode matches any checked mode
    const hasModeMatch = prefs.preferredMode.some(m =>
        m.toLowerCase() === job.mode.toLowerCase()
    );
    if (hasModeMatch) score += 10;

    // Rule 5: +10 if job.experience matches experienceLevel
    // Simple string match as per requirement logic 'matches experienceLevel'
    // Assuming strict equality for now, or partial match if needed. 
    // Given drop-downs usually align, we'll try strict first, then relaxed if strings differ slightly.
    // The Data uses 'Fresher', '0-1 Years', etc.
    if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // Rule 6: +15 if overlap between job.skills and user.skills (any match)
    const jobSkillsLower = job.skills.map(s => s.toLowerCase());
    const userSkillsLower = prefs.skills.map(s => s.trim().toLowerCase()).filter(s => s);

    const hasSkillMatch = userSkillsLower.some(skill =>
        jobSkillsLower.includes(skill)
    );
    if (hasSkillMatch) score += 15;

    // Rule 7: +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) score += 5;

    // Rule 8: +5 if source is LinkedIn
    if (job.source === 'LinkedIn') score += 5;

    // Cap score at 100
    return Math.min(score, 100);
};


// Salary Parsing for Sorting
// Extracts the first number found and normalizes it.
// "3-5 LPA" -> 300000
// "15k-40k/month" -> 15000 * 12 = 180000
export const parseSalary = (salaryRange: string): number => {
    const normalize = (val: string): number => {
        const salaryLower = val.toLowerCase();
        // Extract first numeric match including decimals
        const match = salaryLower.match(/(\d+(\.\d+)?)/);
        if (!match) return 0;

        let amount = parseFloat(match[0]);

        if (salaryLower.includes('lpa')) {
            amount *= 100000;
        } else if (salaryLower.includes('k')) {
            amount *= 1000;
            // If monthly, annualize
            if (salaryLower.includes('month') || salaryLower.includes('mo')) {
                amount *= 12;
            }
        } else if (salaryLower.includes('month') || salaryLower.includes('mo')) {
            amount *= 12; // optimize for "30000/month"
        }

        return amount;
    };

    return normalize(salaryRange);
};

export const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (score >= 40) return 'bg-gray-100 text-gray-800 border-gray-200';
    return 'bg-gray-50 text-gray-400 border-gray-100'; // Subtle grey for <40
};
