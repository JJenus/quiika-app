import React from 'react';
import { Gift, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
                  Quiika
                </h3>
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                  Gifting Platform
                </p>
              </div>
            </div>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              Making digital gifting simple, secure, and meaningful. Send money as gifts with custom rules and instant withdrawals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/create" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Create Gift
                </Link>
              </li>
              <li>
                <Link 
                  to="/claim" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Claim Gift
                </Link>
              </li>
              <li>
                <Link 
                  to="/transactions" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href="mailto:support@quiika.com" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  support@quiika.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a 
                  href="tel:+15551234567" 
                  className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-text-secondary dark:text-text-secondary-dark">
                  123 Tech Street<br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-text-secondary dark:text-text-secondary-dark">
              <span>© {currentYear} Quiika. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for better gifting experiences.</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};