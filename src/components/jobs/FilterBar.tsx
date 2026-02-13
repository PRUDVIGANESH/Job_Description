
import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    locationFilter: string;
    setLocationFilter: (location: string) => void;
    modeFilter: string;
    setModeFilter: (mode: string) => void;
    experienceFilter: string;
    setExperienceFilter: (exp: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    showMatchesOnly: boolean;
    setShowMatchesOnly: (show: boolean) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    hasPreferences: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    modeFilter,
    setModeFilter,
    experienceFilter,
    setExperienceFilter,
    statusFilter,
    setStatusFilter,
    showMatchesOnly,
    setShowMatchesOnly,
    sortBy,
    setSortBy,
    hasPreferences
}) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">

            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search roles or companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap gap-2 items-center">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                    <option value="">All Statuses</option>
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>

                <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                    <option value="">All Locations</option>
                    <option value="Remote">Remote</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Noida">Noida</option>
                    <option value="Mumbai">Mumbai</option>
                </select>

                <select
                    value={modeFilter}
                    onChange={(e) => setModeFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                    <option value="">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>

                <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                    <option value="">Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                </select>

                <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

                {/* Sort */}
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/20 appearance-none cursor-pointer"
                    >
                        <option value="Latest">Latest</option>
                        <option value="Score">Match Score</option>
                        <option value="Salary">Salary</option>
                    </select>
                </div>

                {/* Match Toggle */}
                {hasPreferences && (
                    <button
                        onClick={() => setShowMatchesOnly(!showMatchesOnly)}
                        className={`px-3 py-2 text-sm border rounded-lg flex items-center gap-2 transition-colors ${showMatchesOnly
                            ? 'bg-accent text-white border-accent'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <span>Only Matches</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
