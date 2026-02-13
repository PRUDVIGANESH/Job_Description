
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Rocket } from 'lucide-react';

const ShipPage = () => {
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerTestStatus');
        if (stored) {
            const checkedItems: string[] = JSON.parse(stored);
            // Must match the 10 items in TestPage
            if (checkedItems.length >= 10) {
                setIsLocked(false);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-bounce-subtle">
                    <Lock className="h-10 w-10 text-gray-400" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Access Locked</h1>
                <p className="text-gray-500 max-w-md mb-8">
                    You cannot access the shipping page until all pre-flight checks are completed.
                </p>
                <Link
                    to="/jt/07-test"
                    className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors shadow-md"
                >
                    Go to Test Checklist
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border-2 border-green-100">
                    <Rocket className="h-12 w-12 text-green-600 ml-1" />
                </div>
            </div>

            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Ready for Liftoff!</h1>
            <p className="text-lg text-gray-600 max-w-md mb-8">
                All systems functional. The application is ready to be shipped.
                <br />
                <span className="text-sm text-gray-400 block mt-2">(This is a simulated deployment screen)</span>
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => alert("Deployment sequence initiated! (Simulated)")}
                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-transform hover:scale-105 shadow-lg"
                >
                    SHIP IT 🚀
                </button>
                <Link
                    to="/dashboard"
                    className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default ShipPage;
