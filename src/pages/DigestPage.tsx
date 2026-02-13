
import { useState, useEffect } from 'react';
import { Mail, Copy, Check, FileText, AlertCircle } from 'lucide-react';
import { jobs, type Job } from '../data/jobs';
import { calculateMatchScore, getScoreColor } from '../utils/scoring';
import type { UserPreferences } from '../utils/types';

interface DigestJob extends Job {
    matchScore: number;
}

const DigestPage = () => {
    const [digest, setDigest] = useState<DigestJob[]>([]);
    const [prefs, setPrefs] = useState<UserPreferences | null>(null);
    const [generatedDate, setGeneratedDate] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        // Load preferences
        const storedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (storedPrefs) {
            setPrefs(JSON.parse(storedPrefs));
        }

        // Check for today's digest
        const today = new Date().toISOString().split('T')[0];
        const storedDigest = localStorage.getItem(`jobTrackerDigest_${today}`);

        if (storedDigest) {
            setDigest(JSON.parse(storedDigest));
            setGeneratedDate(today);
        }
    }, []);

    const generateDigest = () => {
        if (!prefs) return;

        const today = new Date().toISOString().split('T')[0];

        // 1. Calculate Scores
        const scoredJobs = jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs)
        }));

        // 2. Sort: Match Score (desc) -> Posted Date (asc)
        scoredJobs.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        // 3. Take Top 10
        const top10 = scoredJobs.slice(0, 10);

        // 4. Persist
        setDigest(top10);
        setGeneratedDate(today);
        localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(top10));
    };

    const copyToClipboard = () => {
        if (digest.length === 0) return;

        const text = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location} | Match: ${job.matchScore}%\n   Link: ${job.applyUrl}\n`
        ).join('\n');

        const header = `My 9AM Job Digest - ${generatedDate}\n-----------------------------------\n\n`;
        navigator.clipboard.writeText(header + text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const createEmailDraft = () => {
        if (digest.length === 0) return;

        const subject = encodeURIComponent("My 9AM Job Digest");
        const bodyText = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company}%0D%0A   Location: ${job.location} | Match: ${job.matchScore}%%0D%0A   Link: ${job.applyUrl}%0D%0A`
        ).join('%0D%0A');

        const header = `My 9AM Job Digest - ${generatedDate}%0D%0A-----------------------------------%0D%0A%0D%0A`;
        window.location.href = `mailto:?subject=${subject}&body=${header}${bodyText}`;
    };

    if (!prefs) {
        return (
            <div className="animate-fade-in text-center py-20">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
                    <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-text-primary">Setup Required</h2>
                <p className="mt-2 text-text-secondary">Set your preferences in Settings to generate a personalized digest.</p>
                <div className="mt-6">
                    <a href="/settings" className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors">Go to Settings</a>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in pb-20 max-w-3xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-text-primary">Daily Digest</h1>
                    <p className="text-text-secondary mt-1">Your curated list of top opportunities.</p>
                </div>
                {!generatedDate && (
                    <button
                        onClick={generateDigest}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors shadow-sm"
                    >
                        <Mail className="h-4 w-4" />
                        Generate Today's 9AM Digest (Simulated)
                    </button>
                )}
            </div>

            {digest.length > 0 ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Digest Header */}
                    <div className="bg-gray-50 border-b border-gray-200 p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white border border-gray-100 shadow-sm mb-4">
                            <Mail className="h-6 w-6 text-accent" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-text-primary">Top 10 Jobs For You — 9AM Digest</h2>
                        <p className="text-text-secondary mt-1">{generatedDate}</p>
                        <p className="text-xs text-gray-400 mt-2 italic">Demo Mode: Daily 9AM trigger simulated manually.</p>
                    </div>

                    {/* Job List */}
                    <div className="divide-y divide-gray-100">
                        {digest.map((job) => (
                            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-accent transition-colors">{job.title}</h3>
                                        <p className="text-gray-600">{job.company} • {job.location}</p>
                                        <p className="text-sm text-gray-500 mt-1">{job.experience} • {job.salaryRange}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md border ${getScoreColor(job.matchScore)}`}>
                                            {job.matchScore}% Match
                                        </span>
                                        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent hover:underline">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer / Actions */}
                    <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">This digest was generated based on your preferences.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                {isCopied ? "Copied" : "Copy Digest"}
                            </button>
                            <button
                                onClick={createEmailDraft}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <FileText className="h-4 w-4" />
                                Create Email Draft
                            </button>
                        </div>
                    </div>
                </div>
            ) : generatedDate ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500">No matching roles today. Check again tomorrow.</p>
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500">Click the button above to simulate today's digest generation.</p>
                </div>
            )}
        </div>
    );
};

export default DigestPage;
