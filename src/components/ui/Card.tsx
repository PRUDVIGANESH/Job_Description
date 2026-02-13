
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, title, footer }) => {
    return (
        <div className="kod-card" style={{ marginBottom: 'var(--space-md)' }}>
            {title && (
                <div className="kod-card__title" style={{ paddingBottom: 'var(--space-sm)', borderBottom: '1px solid var(--color-border)' }}>
                    {title}
                </div>
            )}
            <div style={{ paddingTop: title ? 'var(--space-md)' : 0 }}>
                {children}
            </div>
            {footer && (
                <div style={{ padding: 'var(--space-sm) var(--space-md)', backgroundColor: '#FAFAFA', borderTop: '1px solid var(--color-border)' }}>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
