import { useState, useEffect } from 'react';
import { jobs, type Job } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import FilterBar from '../components/jobs/FilterBar';
import JobModal from '../components/jobs/JobModal';
import { Layout } from 'lucide-react';

const DashboardPage = () => {
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [modeFilter, setModeFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobs(JSON.parse(saved));
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

    // Filter Logic
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = locationFilter ? job.location === locationFilter : true;
        const matchesMode = modeFilter ? job.mode === modeFilter : true;
        const matchesExperience = experienceFilter ? job.experience === experienceFilter : true;

        return matchesSearch && matchesLocation && matchesMode && matchesExperience;
    });

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary mt-1">
                    Showing {filteredJobs.length} opportunities matching your criteria.
                </p>
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
            />

            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobs.includes(job.id)}
                            onToggleSave={toggleSave}
                            onView={handleViewJob}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                        <Layout className="h-8 w-8 text-accent" />
                    </div>
                    <p className="text-gray-500">No jobs found matching your filters.</p>
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
