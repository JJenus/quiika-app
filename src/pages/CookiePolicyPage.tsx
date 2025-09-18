import React from 'react';
import { Cookie, Settings, Eye, BarChart3, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* What Are Cookies */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Quiika uses cookies to enhance your experience, analyze site usage, and provide personalized content. This policy explains what cookies we use and why.
            </p>
          </Card>

          {/* Types of Cookies */}
          <Card>
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and performance</li>
                  <li>Accessibility preferences</li>
                </ul>
                <p className="text-sm text-green-700 mt-2 font-medium">
                  ✓ These cookies cannot be disabled as they are essential for site functionality.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Language and region settings</li>
                  <li>Form data and user preferences</li>
                  <li>Recently viewed transactions</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Page views and user journeys</li>
                  <li>Feature usage and performance metrics</li>
                  <li>Error tracking and debugging</li>
                  <li>A/B testing and optimization</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies track your activity across websites to help advertisers deliver more relevant advertising.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Targeted advertising and retargeting</li>
                  <li>Social media integration</li>
                  <li>Campaign effectiveness measurement</li>
                  <li>Cross-platform user identification</li>
                </ul>
                <p className="text-sm text-orange-700 mt-2 font-medium">
                  ⚠️ Currently, we do not use marketing cookies, but this may change in the future.
                </p>
              </div>
            </div>
          </Card>

          {/* Third-Party Cookies */}
          <Card>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Some cookies on our site are set by third-party services that provide additional functionality or analytics. These third parties may place cookies to support features like embedded content, analytics tracking, or social media integration.
              </p>
              <p className="text-gray-600">
                We work with trusted third-party providers to ensure your data is handled securely and in compliance with applicable privacy laws. Below are examples of third-party cookies we may use:
              </p>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-Party Services</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Google Analytics: Tracks and reports website traffic to help us improve user experience.</li>
                  <li>Social Media Widgets: Enables sharing or interaction with social media platforms like Twitter or LinkedIn.</li>
                  <li>Embedded Content: Supports videos or other media embedded from platforms like YouTube or Vimeo.</li>
                  <li>Advertising Partners: If we enable marketing cookies in the future, these may include cookies from ad networks.</li>
                </ul>
                <p className="text-sm text-indigo-700 mt-2 font-medium">
                  ℹ️ You can manage third-party cookies through your browser settings or our cookie consent tool.
                </p>
              </div>
              <p className="text-gray-600">
                We ensure that any third-party cookies comply with our privacy standards and are used only to enhance your experience or provide valuable insights into site performance.
              </p>
            </div>
          </Card>

          {/* Managing Cookies */}
          <Card>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Managing Cookies</h2>
            </div>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies through our cookie consent tool, which allows you to opt out of non-essential cookies. You can also adjust your browser settings to block or delete cookies.
            </p>
            <p className="text-gray-600">
              Note that disabling certain cookies may affect the functionality of our website. For more information on how to manage cookies, please refer to your browser’s help section or visit{' '}
              <a href="https://www.allaboutcookies.org" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                www.allaboutcookies.org
              </a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};