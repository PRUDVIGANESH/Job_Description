
import { useState, useEffect } from 'react';
import { jobs, type Job } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';
import { Bookmark, CheckCircle } from 'lucide-react';

const SavedPage = () => {
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Status State
    const [jobStatus, setJobStatus] = useState<Record<string, string>>({});
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobs(JSON.parse(saved));
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

    const savedJobObjects = jobs.filter((job) => savedJobs.includes(job.id));

    return (
        <div className="animate-fade-in relative">
            {toastMessage && (
                <div className="fixed top-24 right-8 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-primary">Saved Jobs</h1>
                <p className="text-text-secondary mt-1">
                    You have saved {savedJobObjects.length} jobs.
                </p>
            </div>

            {savedJobObjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobObjects.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={true}
                            onToggleSave={toggleSave}
                            onView={handleViewJob}
                            status={jobStatus[job.id] || 'Not Applied'}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-border p-12 text-center shadow-sm">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                        <Bookmark className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-text-primary">No saved jobs</h3>
                    <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
                        Jobs you save from your dashboard will appear here for easy access and application tracking.
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

export default SavedPage;
