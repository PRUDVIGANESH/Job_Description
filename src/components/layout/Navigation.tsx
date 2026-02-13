
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/saved', label: 'Saved' },
        { path: '/digest', label: 'Digest' },
        { path: '/settings', label: 'Settings' },
        { path: '/proof', label: 'Proof' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-bg border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="font-serif font-bold text-xl text-text-primary">
                            KodNest Premium
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:space-x-8">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive
                                        ? 'border-accent text-accent'
                                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="pt-2 pb-3 space-y-1 bg-bg border-b border-border shadow-lg">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                        ? 'bg-red-50 border-accent text-accent'
                                        : 'border-transparent text-text-secondary hover:bg-gray-50 hover:border-gray-300 hover:text-text-primary'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
