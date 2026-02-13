
import React, { useState } from 'react';

const ProofFooter: React.FC = () => {
    const [checks, setChecks] = useState({
        uiCoded: false,
        logicWorking: false,
        testPassed: false,
        deployed: false
    });

    const toggleCheck = (key: keyof typeof checks) => {
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <footer className="kod-proof">
            <div className="kod-proof__list">
                {Object.entries(checks).map(([key, value]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: value ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() => toggleCheck(key as keyof typeof checks)}
                        />
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                ))}
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Proof of Work required to proceed</div>
        </footer>
    );
};

export default ProofFooter;
