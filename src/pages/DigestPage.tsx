
import { Mail } from 'lucide-react';

const DigestPage = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-primary">Daily Digest</h1>
                <p className="text-text-secondary mt-1">Your personalized job feed, delivered daily.</p>
            </div>

            <div className="bg-white rounded-lg border border-border p-12 text-center shadow-sm">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                    <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-text-primary">No digest available</h3>
                <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
                    Your daily digest will be generated based on your preferences. Check back tomorrow at 9AM.
                </p>
            </div>
        </div>
    );
};

export default DigestPage;
