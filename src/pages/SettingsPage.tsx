

const SettingsPage = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-10">
            <div className="border-b border-border pb-4">
                <h2 className="text-3xl font-serif font-bold text-text-primary">Preferences</h2>
                <p className="text-text-secondary mt-1">Configure your job tracking parameters.</p>
            </div>

            <div className="space-y-8">
                {/* Role Keywords */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Role Keywords</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. Frontend Engineer, Product Designer"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-3 border"
                            disabled
                        />
                        <p className="mt-2 text-sm text-text-secondary">Comma separated values.</p>
                    </div>
                </div>

                {/* Preferred Locations */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Preferred Locations</label>
                    <input
                        type="text"
                        placeholder="e.g. San Francisco, London, Remote"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-3 border"
                        disabled
                    />
                </div>

                {/* Mode */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Work Mode</label>
                    <div className="flex space-x-4">
                        {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                            <button
                                key={mode}
                                className="px-4 py-2 border border-border rounded-md text-text-secondary hover:border-accent hover:text-accent transition-colors"
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-text-primary">Experience Level</label>
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-3 border text-text-secondary"
                        disabled
                    >
                        <option>Junior (0-2 years)</option>
                        <option>Mid-Level (2-5 years)</option>
                        <option>Senior (5+ years)</option>
                        <option>Lead/Staff</option>
                    </select>
                </div>

                <div className="pt-6">
                    <button
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50"
                        disabled
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
