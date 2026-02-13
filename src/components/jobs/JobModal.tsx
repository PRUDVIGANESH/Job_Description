
import React from 'react';
import type { Job } from '../../data/jobs';
import { X, MapPin, Briefcase, IndianRupee, Clock, Building2, ExternalLink } from 'lucide-react';

interface JobModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="h-14 w-14 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                            <Building2 className="h-7 w-7 text-gray-500" />
                        </div>
                        <div>
                            <h2 className="font-serif font-bold text-2xl text-gray-900 mb-1">{job.title}</h2>
                            <p className="text-gray-500 font-medium text-lg">{job.company}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Location</p>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                {job.location}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Experience</p>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                                {job.experience}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Salary</p>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                <IndianRupee className="h-3.5 w-3.5 text-gray-400" />
                                {job.salaryRange}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Posted</p>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">About the Role</h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{job.description}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">Skills Required</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Close
                        </button>
                        <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors shadow-sm"
                        >
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
