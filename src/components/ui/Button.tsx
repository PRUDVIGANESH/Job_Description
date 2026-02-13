import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    style,
    ...props
}) => {
    const baseStyle: React.CSSProperties = {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const variantStyles = {
        primary: {
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-white)',
        },
        secondary: {
            backgroundColor: 'var(--color-text-primary)',
            color: 'var(--color-white)',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
        }
    };

    const sizeStyles = {
        sm: {
            padding: '6px 12px',
            fontSize: '14px',
        },
        md: {
            padding: '10px 20px',
            fontSize: '16px',
        },
        lg: {
            padding: '14px 28px',
            fontSize: '18px',
        }
    };

    return (
        <button
            style={{
                ...baseStyle,
                ...variantStyles[variant],
                ...sizeStyles[size],
                ...style
            }}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
