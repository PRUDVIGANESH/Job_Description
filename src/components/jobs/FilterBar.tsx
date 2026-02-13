
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
}

const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    modeFilter,
    setModeFilter,
    experienceFilter,
    setExperienceFilter
}) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">

            {/* Search */}
            <div className="relative flex-1">
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
            <div className="flex flex-wrap gap-2 md:flex-nowrap">
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

                <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline">Latest</span>
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
