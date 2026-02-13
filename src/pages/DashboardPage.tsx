
import { useState, useEffect, useMemo } from 'react';
import { jobs, type Job } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import FilterBar from '../components/jobs/FilterBar';
import JobModal from '../components/jobs/JobModal';
import { Layout, AlertCircle, CheckCircle } from 'lucide-react';
import { calculateMatchScore } from '../utils/scoring';
import type { UserPreferences } from '../utils/types';

// Extended Job type to include score for local processing
interface ScoredJob extends Job {
    matchScore: number;
}

const DashboardPage = () => {
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prefs, setPrefs] = useState<UserPreferences | null>(null);
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);
    const [sortBy, setSortBy] = useState('Latest');

    // Status State
    const [jobStatus, setJobStatus] = useState<Record<string, string>>({});
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [modeFilter, setModeFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');


    useEffect(() => {
        const storedSaved = localStorage.getItem('savedJobs');
        if (storedSaved) {
            setSavedJobs(JSON.parse(storedSaved));
        }

        const storedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (storedPrefs) {
            setPrefs(JSON.parse(storedPrefs));
        }

        const storedStatus = localStorage.getItem('jobTrackerStatus');
        if (storedStatus) {
            setJobStatus(JSON.parse(storedStatus));
        }
    }, []);

    const toggleSave = (id: string) => {
        let newSaved;
        if (savedJobs.includes(id)) {
            newSaved = savedJobs.filter((jobId) => jobId !== id);
        } else {
            newSaved = [...savedJobs, id];
        }
        setSavedJobs(newSaved);
        localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    };

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        const updatedStatus = { ...jobStatus, [id]: newStatus };
        setJobStatus(updatedStatus);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatus));

        // Show Toast
        setToastMessage(`Status updated to: ${newStatus}`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Calculate Scores and Filter
    const processedJobs = useMemo(() => {
        let jobList: ScoredJob[] = jobs.map(job => ({
            ...job,
            matchScore: prefs ? calculateMatchScore(job, prefs) : 0
        }));

        // 1. Initial Filtering
        jobList = jobList.filter((job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLocation = locationFilter ? job.location === locationFilter : true;
            const matchesMode = modeFilter ? job.mode === modeFilter : true;
            const matchesExperience = experienceFilter ? job.experience === experienceFilter : true;

            // Status Filter (Default to 'Not Applied' if undefined)
            const currentStatus = jobStatus[job.id] || 'Not Applied';
            const matchesStatus = statusFilter ? currentStatus === statusFilter : true;

            // Match Score Threshold Filter
            const matchesScore = showMatchesOnly && prefs
                ? job.matchScore >= prefs.minMatchScore
                : true;

            return matchesSearch && matchesLocation && matchesMode && matchesExperience && matchesStatus && matchesScore;
        });

        // 2. Sorting
        jobList.sort((a, b) => {
            if (sortBy === 'Score') {
                return b.matchScore - a.matchScore;
            } else if (sortBy === 'Salary') {
                return a.salaryRange.localeCompare(b.salaryRange);
            } else {
                return a.postedDaysAgo - b.postedDaysAgo;
            }
        });

        return jobList;
    }, [jobs, prefs, searchQuery, locationFilter, modeFilter, experienceFilter, statusFilter, showMatchesOnly, sortBy, jobStatus]);


    return (
        <div className="animate-fade-in pb-20 relative">
            {toastMessage && (
                <div className="fixed top-24 right-8 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary mt-1">
                    Showing {processedJobs.length} opportunities matching your criteria.
                </p>

                {!prefs && (
                    <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-900">Set your preferences</h4>
                            <p className="text-sm text-blue-700">Configure your role, skills and location in Settings to activate intelligent matching scores.</p>
                        </div>
                    </div>
                )}
            </div>

            <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                modeFilter={modeFilter}
                setModeFilter={setModeFilter}
                experienceFilter={experienceFilter}
                setExperienceFilter={setExperienceFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                showMatchesOnly={showMatchesOnly}
                setShowMatchesOnly={setShowMatchesOnly}
                sortBy={sortBy}
                setSortBy={setSortBy}
                hasPreferences={!!prefs}
            />

            {processedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {processedJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            matchScore={job.matchScore}
                            isSaved={savedJobs.includes(job.id)}
                            onToggleSave={toggleSave}
                            onView={handleViewJob}
                            status={jobStatus[job.id] || 'Not Applied'}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                        <Layout className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No matching jobs found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">
                        {showMatchesOnly
                            ? "Try lowering your match score threshold in Settings or disabling the 'Only Matches' toggle."
                            : "Try adjusting your filters to see more results."}
                    </p>
                </div>
            )}

            <JobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default DashboardPage;
