
import { FileText } from 'lucide-react';

const ProofPage = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-primary">Proof of Concept</h1>
                <p className="text-text-secondary mt-1">Artifacts and verification data.</p>
            </div>

            <div className="bg-white rounded-lg border border-border p-8 border-dashed">
                <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-text-secondary text-center">
                        This section is a placeholder for future artifact collection and project verification data.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
