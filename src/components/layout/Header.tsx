import React from 'react';
import { Gift, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create Gift' },
    { path: '/claim', label: 'Claim Gift' },
    // { path: '/transactions', label: 'Transactions' },
    { path: '/rules', label: 'Rule Manager' }
  ];

  // Helper function to check if a nav item is active
  const isActive = (path: string) => {
    // For home page, exact match
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other pages, check if current path starts with the nav item path
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-surface dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
                Quiika
              </h1>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Gifting Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`transition-colors duration-200 ${
                        active
                          ? 'text-primary dark:text-primary-light font-semibold'
                          : 'text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
            <nav>
              <ul className="flex flex-col space-y-3">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.path}>
                      <Link 
                        onClick={() => setIsMobileMenuOpen(false)}
                        to={item.path} 
                        className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                          active
                            ? 'text-primary dark:text-primary-light font-semibold bg-primary/10 dark:bg-primary/20'
                            : 'text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};