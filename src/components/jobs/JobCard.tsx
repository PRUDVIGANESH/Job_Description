
import React from 'react';
import type { Job } from '../../data/jobs';
import { MapPin, Briefcase, Clock, Bookmark, ExternalLink, Eye, Building2, IndianRupee, ChevronDown } from 'lucide-react';
import { getScoreColor } from '../../utils/scoring';

interface JobCardProps {
    job: Job;
    matchScore?: number;
    isSaved: boolean;
    onToggleSave: (id: string) => void;
    onView: (job: Job) => void;
    status: string;
    onStatusChange: (id: string, status: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, matchScore, isSaved, onToggleSave, onView, status, onStatusChange }) => {

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Applied': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
            case 'Selected': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:border-gray-200 relative animate-fade-in flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
                        <Building2 className="h-5 w-5 text-gray-500 group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                            {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{job.company}</p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full border ${job.source === 'LinkedIn' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        job.source === 'Naukri' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                            'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}>
                        {job.source}
                    </span>
                    {matchScore !== undefined && matchScore > 0 && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getScoreColor(matchScore)}`}>
                            {matchScore}% Match
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm text-gray-600 flex-grow">
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="truncate max-w-[100px]" title={job.location}>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="truncate max-w-[100px]" title={job.experience}>{job.experience}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <IndianRupee className="h-4 w-4 text-gray-400" />
                    <span className="truncate max-w-[100px]" title={job.salaryRange}>{job.salaryRange}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                </div>
            </div>

            <div className="mt-auto space-y-3">
                {/* Status Selector */}
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status:</span>
                    <div className="relative group/status">
                        <button className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(status)}`}>
                            {status}
                            <ChevronDown className="h-3 w-3" />
                        </button>
                        <div className="absolute right-0 bottom-full mb-1 w-32 bg-white rounded-lg shadow-xl border border-gray-200 hidden group-hover/status:block z-10 overflow-hidden">
                            {['Not Applied', 'Applied', 'Rejected', 'Selected'].map((s) => (
                                <button
                                    key={s}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onStatusChange(job.id, s);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${status === s ? 'font-bold text-accent bg-red-50' : 'text-gray-700'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex gap-2">
                        <button
                            onClick={() => onView(job)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <Eye className="h-3.5 w-3.5" />
                            View
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-accent border border-transparent rounded-md hover:bg-accent-hover transition-colors shadow-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onStatusChange(job.id, 'Applied'); // Auto-update to Applied on click
                            }}
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Apply
                        </a>
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
            </div>
        </div>
    );
};

export default JobCard;
