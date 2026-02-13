
import React from 'react';

const SecondaryPanel: React.FC = () => {
    return (
        <aside className="kod-secondary" style={{ height: 'calc(100vh - 64px - 64px)' }}>
            <div>
                <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-xs)' }}>Instructions</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--color-text-secondary)' }}>
                    Follow the steps carefully. Copy the prompt below to generate the code for this step.
                </p>
            </div>

            <div className="kod-panel__prompt">// Prompt will appear here...</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }} className="kod-panel__actions">
                <button>Copy Prompt</button>
                <button style={{ color: 'var(--color-accent)' }}>Build in Lovable</button>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: 'var(--space-sm)' }}>
                <button className="kod-panel__success">It Worked</button>
                <button className="kod-panel__warning">Issue</button>
            </div>
        </aside>
    );
};

export default SecondaryPanel;
