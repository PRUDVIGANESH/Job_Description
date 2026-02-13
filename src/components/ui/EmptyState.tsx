import React from 'react';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-xl)',
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            minHeight: '400px'
        }}>
            {icon && <div style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>{icon}</div>}
            <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                marginBottom: 'var(--space-sm)',
                color: 'var(--color-text-primary)'
            }}>
                {title}
            </h3>
            {description && (
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '400px',
                    margin: '0 auto'
                }}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default EmptyState;
