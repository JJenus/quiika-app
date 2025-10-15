import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hideCloseButton?: boolean;
  showSecurityBadge?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
  hideCloseButton = false,
  showSecurityBadge = false,
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'calc(100vw - 100%)'; // Prevent layout shift
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Enhanced Backdrop with blur effect */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300 ease-out"
          onClick={onClose}
        />
        
        {/* Enhanced Modal Container */}
        <div className={`
          relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full 
          border border-gray-200 dark:border-gray-700
          transform transition-all duration-300 ease-out
          ${sizeClasses[size]} ${className}
          ${isOpen ? 'animate-scale-in' : 'animate-scale-out'}
        `}>
          {/* Security Badge */}
          {showSecurityBadge && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg border border-green-300">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Secure & Encrypted</span>
              </div>
            </div>
          )}

          {/* Enhanced Header */}
          {(title || !hideCloseButton) && (
            <div className={`
              flex items-center justify-between px-6 py-5 
              border-b border-gray-100 dark:border-gray-800
              ${!title ? 'justify-end' : ''}
            `}>
              {title && (
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                </div>
              )}
              
              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className={`
                    flex-shrink-0 p-2 rounded-xl transition-all duration-200
                    hover:bg-gray-100 dark:hover:bg-gray-800 
                    hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    ${title ? 'ml-4' : ''}
                  `}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                </button>
              )}
            </div>
          )}
          
          {/* Content Area with improved padding */}
          <div className={`
            ${title || !hideCloseButton ? 'px-6 py-6' : 'p-6'}
          `}>
            {children}
          </div>

          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        </div>
      </div>
    </div>
  );
};