
import { useState, useEffect } from 'react';
import { CheckCircle, Copy, AlertCircle, Rocket } from 'lucide-react';

const STEPS = [
    { id: 'project-setup', label: 'Project Setup & Tailwind' },
    { id: 'core-arch', label: 'Core Architecture & Routing' },
    { id: 'skeleton', label: 'Page Skeletons' },
    { id: 'data-features', label: 'Data & Core Features' },
    { id: 'scoring', label: 'Scoring & Preferences' },
    { id: 'digest', label: 'Daily Digest System' },
    { id: 'status', label: 'Job Status Tracking' },
    { id: 'test-ship', label: 'Test Checklist & Ship Lock' }
];

const ProofPage = () => {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });

    const [testPassed, setTestPassed] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Load links
        const storedLinks = localStorage.getItem('jobTrackerProofData');
        if (storedLinks) {
            setLinks(JSON.parse(storedLinks));
        }

        // Check tests
        const storedTests = localStorage.getItem('jobTrackerTestStatus');
        if (storedTests) {
            const checkedItems: string[] = JSON.parse(storedTests);
            if (checkedItems.length >= 10) {
                setTestPassed(true);
            }
        }
    }, []);

    const handleLinkChange = (field: keyof typeof links, value: string) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem('jobTrackerProofData', JSON.stringify(newLinks));
    };

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const allLinksValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed);
    const isShipped = allLinksValid && testPassed;

    const copySubmission = () => {
        const text = `
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-primary">Proof of Work</h1>
                <p className="text-text-secondary mt-1">Final verification and submission generation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Status & Steps */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className={`p-6 rounded-xl border ${isShipped ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Project Status</h3>
                        <div className="flex items-center gap-3">
                            {isShipped ? (
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Rocket className="h-5 w-5 text-green-600" />
                                </div>
                            ) : (
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="h-5 w-5 text-gray-400" />
                                </div>
                            )}
                            <div>
                                <p className={`text-xl font-bold ${isShipped ? 'text-green-700' : 'text-gray-900'}`}>
                                    {isShipped ? 'Shipped' : allLinksValid ? 'In Progress' : 'Not Started'}
                                </p>
                                {isShipped && <p className="text-xs text-green-600 font-medium">Project 1 Shipped Successfully.</p>}
                            </div>
                        </div>
                    </div>

                    {/* Steps Summary */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Step Completion</h3>
                        <div className="space-y-3">
                            {STEPS.map((step) => (
                                <div key={step.id} className="flex items-center gap-3 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-gray-700 line-through decoration-gray-300">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Inputs & Submission */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Artifact Inputs */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Artifact Collection</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lovable Project Link</label>
                                <input
                                    type="url"
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                    placeholder="https://lovable.dev/..."
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isValidUrl(links.lovable) ? 'border-gray-200 focus:ring-accent/20' : 'border-red-200 focus:ring-red-200'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository Link</label>
                                <input
                                    type="url"
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isValidUrl(links.github) ? 'border-gray-200 focus:ring-accent/20' : 'border-red-200 focus:ring-red-200'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deployed URL</label>
                                <input
                                    type="url"
                                    value={links.deployed}
                                    onChange={(e) => handleLinkChange('deployed', e.target.value)}
                                    placeholder="https://vercel.app/..."
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isValidUrl(links.deployed) ? 'border-gray-200 focus:ring-accent/20' : 'border-red-200 focus:ring-red-200'}`}
                                />
                            </div>
                        </div>

                        {!testPassed && (
                            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-2 items-start">
                                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800">
                                    Final validation pending. Please complete all items in the <a href="/jt/07-test" className="underline font-medium">Test Checklist</a>.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Final Submission */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-serif font-bold text-gray-900">Final Submission</h3>
                            <button
                                onClick={copySubmission}
                                disabled={!isShipped}
                                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${isShipped
                                    ? 'bg-accent text-white hover:bg-accent-hover'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'Copied' : 'Copy Final Submission'}
                            </button>
                        </div>

                        <div className="font-mono text-xs bg-white p-4 rounded-lg border border-gray-200 text-gray-600 whitespace-pre-wrap">
                            {`Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable || '[Missing]'}

GitHub Repository:
${links.github || '[Missing]'}

Live Deployment:
${links.deployed || '[Missing]'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProofPage;
