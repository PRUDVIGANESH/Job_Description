
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/saved', label: 'Saved' },
        { path: '/digest', label: 'Digest' },
        { path: '/settings', label: 'Settings' },
        { path: '/proof', label: 'Proof' },
    ];

    const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
        return {
            textDecoration: 'none',
            color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all var(--transition-normal)',
            display: 'inline-block'
        };
    };

    return (
        <nav style={{
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            position: 'relative' // For mobile menu absolute positioning if needed
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 var(--space-md)',
                height: '64px'
            }}>
                {/* Desktop Navigation */}
                <div className="desktop-nav" style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    {navItems.map((item) => (
                        <NavLink key={item.path} to={item.path} style={getLinkStyle}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)'
                    }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '64px',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-bg)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: 'var(--space-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-sm)',
                    zIndex: 10
                }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                ...getLinkStyle({ isActive }),
                                width: '100%',
                                borderBottom: 'none', // Remove underline for mobile list style
                                borderLeft: isActive ? '4px solid var(--color-accent)' : '4px solid transparent',
                                paddingLeft: '12px'
                            })}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}

            {/* Responsive Styles Injection */}
            <style>{`
        .mobile-menu-btn { display: none !important; }
        .desktop-nav { display: flex !important; }

        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default NavBar;
