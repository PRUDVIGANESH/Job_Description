import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary leading-tight max-w-3xl">
                Stop Missing The <span className="text-accent">Right Jobs</span>.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl font-light">
                Precision-matched job discovery delivered daily at 9AM.
                No noise. Just the opportunities that matter.
            </p>
            <div className="pt-4">
                <Link
                    to="/settings"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-hover transition-colors shadow-sm"
                >
                    Start Tracking
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
