import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label, style, ...props }) => {
    return (
        <div style={{ marginBottom: 'var(--space-md)' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--space-xs)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)'
                }}>
                    {label}
                </label>
            )}
            <input
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    outline: 'none',
                    ...style
                }}
                {...props}
            />
        </div>
    );
};

export default Input;
