
import { useState, useEffect } from 'react';
import { CheckSquare, Square, RefreshCcw, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CHECKLIST_ITEMS = [
    { id: 'prefs-persist', label: 'Preferences persist after refresh' },
    { id: 'match-score', label: 'Match score calculates correctly' },
    { id: 'matches-toggle', label: '"Show only matches" toggle works' },
    { id: 'save-job', label: 'Save job persists after refresh' },
    { id: 'apply-link', label: 'Apply opens in new tab' },
    { id: 'status-update', label: 'Status update persists after refresh' },
    { id: 'status-filter', label: 'Status filter works correctly' },
    { id: 'digest-generate', label: 'Digest generates top 10 by score' },
    { id: 'digest-persist', label: 'Digest persists for the day' },
    { id: 'console-errors', label: 'No console errors on main pages' }
];

const TestPage = () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerTestStatus');
        if (stored) {
            setCheckedItems(JSON.parse(stored));
        }
    }, []);

    const toggleItem = (id: string) => {
        let newChecked;
        if (checkedItems.includes(id)) {
            newChecked = checkedItems.filter(item => item !== id);
        } else {
            newChecked = [...checkedItems, id];
        }
        setCheckedItems(newChecked);
        localStorage.setItem('jobTrackerTestStatus', JSON.stringify(newChecked));
    };

    const resetTests = () => {
        if (window.confirm('Are you sure you want to reset all test status?')) {
            setCheckedItems([]);
            localStorage.removeItem('jobTrackerTestStatus');
        }
    };

    const progress = checkedItems.length;
    const total = CHECKLIST_ITEMS.length;
    const isComplete = progress === total;

    return (
        <div className="animate-fade-in pb-20 max-w-2xl mx-auto">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-text-primary">Test Checklist</h1>
                    <p className="text-text-secondary mt-1">Verify application integrity before shipping.</p>
                </div>
                <button
                    onClick={resetTests}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    Reset Status
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                        {isComplete ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                            <AlertTriangle className="h-6 w-6 text-amber-500" />
                        )}
                        <div>
                            <h2 className={`font-bold text-lg ${isComplete ? 'text-green-800' : 'text-gray-900'}`}>
                                Tests Passed: {progress} / {total}
                            </h2>
                            {!isComplete && (
                                <p className="text-sm text-gray-500">Resolve all issues before shipping.</p>
                            )}
                        </div>
                    </div>
                    {isComplete && (
                        <Link to="/jt/08-ship" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm animate-pulse-slow">
                            Ready to Ship →
                        </Link>
                    )}
                </div>

                <div className="divide-y divide-gray-100">
                    {CHECKLIST_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                        >
                            <div className={`flex-shrink-0 transition-colors ${checkedItems.includes(item.id) ? 'text-green-500' : 'text-gray-300 group-hover:text-gray-400'}`}>
                                {checkedItems.includes(item.id) ? (
                                    <CheckSquare className="h-6 w-6" />
                                ) : (
                                    <Square className="h-6 w-6" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <span className={`font-medium ${checkedItems.includes(item.id) ? 'text-gray-900 line-through decoration-gray-300 decoration-2' : 'text-gray-700'}`}>
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
                <Lock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Ship Page Locked</h4>
                    <p className="text-sm text-blue-700 mt-1">
                        The shipping route <code>/jt/08-ship</code> remains locked until all checklist items above are marked as complete.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestPage;
