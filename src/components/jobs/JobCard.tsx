
import React from 'react';
import type { Job } from '../../data/jobs';
import { MapPin, Briefcase, Clock, Bookmark, ExternalLink, Eye, Building2, IndianRupee } from 'lucide-react';

interface JobCardProps {
    job: Job;
    isSaved: boolean;
    onToggleSave: (id: string) => void;
    onView: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onToggleSave, onView }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:border-gray-200 relative animate-fade-in">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                        <Building2 className="h-5 w-5 text-gray-500 group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight group-hover:text-accent transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{job.company}</p>
                    </div>
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full border ${job.source === 'LinkedIn' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    job.source === 'Naukri' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                        'bg-indigo-50 text-indigo-700 border-indigo-100'
                    }`}>
                    {job.source}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {job.location} <span className="text-xs text-gray-400">({job.mode})</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    {job.experience}
                </div>
                <div className="flex items-center gap-1.5">
                    <IndianRupee className="h-4 w-4 text-gray-400" />
                    {job.salaryRange}
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex gap-2">
                    <button
                        onClick={() => onView(job)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        View
                    </button>
                    <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Apply
                    </a>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(job.id);
                    }}
                    className={`p-1.5 rounded-full transition-colors ${isSaved ? 'text-accent bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
