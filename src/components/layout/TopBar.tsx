
import React from 'react';

const TopBar: React.FC = () => {
    return (
        <div className="kod-topbar">
            <div className="kod-topbar__project">New Project / KodNest Premium</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div className="kod-topbar__progress">Step 1 / 5</div>
                <div className="kod-topbar__badge">In Progress</div>
            </div>
        </div>
    );
};

export default TopBar;
