import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, options, style, ...props }) => {
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
            <select
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    outline: 'none',
                    cursor: 'pointer',
                    ...style
                }}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
