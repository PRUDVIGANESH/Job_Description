
import { useState, useEffect } from 'react';
import { Save, Check, ChevronDown, CheckSquare, Square } from 'lucide-react';
import type { UserPreferences } from '../utils/types';

const defaultPreferences: UserPreferences = {
    roleKeywords: [],
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: '',
    skills: [],
    minMatchScore: 40
};

const AVAILABLE_LOCATIONS = [
    'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Mumbai', 'Remote'
];

const SettingsPage = () => {
    const [prefs, setPrefs] = useState<UserPreferences>(defaultPreferences);
    const [saved, setSaved] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerPreferences');
        if (stored) {
            setPrefs(JSON.parse(stored));
        }
    }, []);

    const handleChange = (field: keyof UserPreferences, value: any) => {
        setPrefs(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleArrayChange = (field: keyof UserPreferences, value: string) => {
        // value is comma separated string
        const array = value.split(',').map(s => s.trim()).filter(s => s);
        handleChange(field, array);
    };

    const toggleMode = (mode: string) => {
        const current = prefs.preferredMode;
        const newModes = current.includes(mode)
            ? current.filter(m => m !== mode)
            : [...current, mode];
        handleChange('preferredMode', newModes);
    };

    const toggleLocation = (location: string) => {
        const current = prefs.preferredLocations;
        const newLocations = current.includes(location)
            ? current.filter(l => l !== location)
            : [...current, location];
        handleChange('preferredLocations', newLocations);
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-10 animate-fade-in pb-20">
            <div className="border-b border-border pb-4">
                <h2 className="text-3xl font-serif font-bold text-text-primary">Preferences</h2>
                <p className="text-text-secondary mt-1">Configure your job tracking parameters to enable intelligent matching.</p>
            </div>

            <div className="space-y-8 bg-white p-8 rounded-xl border border-border shadow-sm">

                {/* Role Keywords */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Role Keywords</label>
                    <p className="text-sm text-text-secondary">Comma-separated (e.g. Frontend, React, Java)</p>
                    <input
                        type="text"
                        value={prefs.roleKeywords.join(', ')}
                        onChange={(e) => handleArrayChange('roleKeywords', e.target.value)}
                        placeholder="e.g. Frontend Engineer, Product Designer"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-3 border"
                    />
                </div>

                {/* Preferred Locations - Multi-select Dropdown */}
                <div className="space-y-4 relative">
                    <label className="block text-lg font-medium text-text-primary">Preferred Locations</label>
                    <p className="text-sm text-text-secondary">Select multiple locations</p>

                    <div className="relative">
                        <button
                            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                            className="w-full text-left bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                        >
                            <span className="block truncate">
                                {prefs.preferredLocations.length > 0
                                    ? prefs.preferredLocations.join(', ')
                                    : "Select locations..."}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                            </span>
                        </button>

                        {isLocationDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {AVAILABLE_LOCATIONS.map((location) => (
                                    <div
                                        key={location}
                                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-red-50 text-gray-900`}
                                        onClick={() => toggleLocation(location)}
                                    >
                                        <div className="flex items-center">
                                            {prefs.preferredLocations.includes(location) ? (
                                                <CheckSquare className="h-4 w-4 text-accent mr-3" />
                                            ) : (
                                                <Square className="h-4 w-4 text-gray-300 mr-3" />
                                            )}
                                            <span className={`block truncate ${prefs.preferredLocations.includes(location) ? 'font-semibold' : 'font-normal'}`}>
                                                {location}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mode */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Work Mode</label>
                    <div className="flex space-x-4">
                        {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => toggleMode(mode)}
                                className={`px-4 py-2 border rounded-md transition-colors flex items-center gap-2 ${prefs.preferredMode.includes(mode)
                                        ? 'border-accent bg-red-50 text-accent font-medium'
                                        : 'border-gray-200 text-text-secondary hover:border-accent hover:text-accent'
                                    }`}
                            >
                                {prefs.preferredMode.includes(mode) ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Experience Level</label>
                    <select
                        value={prefs.experienceLevel}
                        onChange={(e) => handleChange('experienceLevel', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-3 border text-text-secondary"
                    >
                        <option value="">Select Level</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                    </select>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Skills</label>
                    <p className="text-sm text-text-secondary">Comma-separated technical skills</p>
                    <input
                        type="text"
                        value={prefs.skills.join(', ')}
                        onChange={(e) => handleArrayChange('skills', e.target.value)}
                        placeholder="e.g. React, Node.js, Python, SQL"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-3 border"
                    />
                </div>

                {/* Min Match Score */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="block text-lg font-medium text-text-primary">Minimum Match Score Threshold</label>
                        <span className="text-accent font-bold">{prefs.minMatchScore}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={prefs.minMatchScore}
                        onChange={(e) => handleChange('minMatchScore', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <p className="text-sm text-text-secondary">Jobs below this score will be hidden when "Show Only Matches" is active.</p>
                </div>

                <div className="pt-6 sticky bottom-0 bg-white border-t border-gray-100 pb-2">
                    <button
                        onClick={handleSave}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-accent hover:bg-accent-hover'
                            }`}
                    >
                        {saved ? <Check className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                        {saved ? 'Preferences Saved!' : 'Save Preferences'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
