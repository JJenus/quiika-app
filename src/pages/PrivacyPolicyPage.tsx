import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Quiika ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital gifting platform and related services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
          </Card>

          {/* Information We Collect */}
          <Card>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Email addresses for gift senders and recipients</li>
                  <li>Bank account information for withdrawals</li>
                  <li>Transaction history and gift preferences</li>
                  <li>Communication preferences and support interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction Data</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Payment information processed through Paystack</li>
                  <li>Gift amounts, rules, and conditions</li>
                  <li>QUID codes and access keys</li>
                  <li>Withdrawal requests and bank details</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Device information and browser type</li>
                  <li>IP addresses and location data</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Error logs and performance metrics</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* How We Use Information */}
          <Card>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Delivery</h3>
                <p className="text-gray-600">
                  We use your information to process gifts, facilitate withdrawals, manage QUID codes, and provide customer support.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security & Fraud Prevention</h3>
                <p className="text-gray-600">
                  We monitor transactions for suspicious activity, verify user identities, and protect against unauthorized access.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-600">
                  We send transaction confirmations, security alerts, service updates, and respond to your inquiries.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Improvement</h3>
                <p className="text-gray-600">
                  We analyze usage patterns to enhance our platform, develop new features, and improve user experience.
                </p>
              </div>
            </div>
          </Card>

          {/* Data Protection */}
          <Card>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Data Protection & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Safeguards</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>End-to-end encryption for sensitive data transmission</li>
                  <li>Secure database storage with access controls</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Multi-factor authentication for administrative access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizational Measures</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Limited access to personal data on a need-to-know basis</li>
                  <li>Employee training on data protection and privacy</li>
                  <li>Incident response procedures for data breaches</li>
                  <li>Regular backup and disaster recovery testing</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Your Rights */}
          <Card>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access & Portability</h3>
                <p className="text-gray-600 text-sm">
                  Request copies of your personal data and transaction history in a portable format.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rectification</h3>
                <p className="text-gray-600 text-sm">
                  Correct inaccurate or incomplete personal information we hold about you.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Erasure</h3>
                <p className="text-gray-600 text-sm">
                  Request deletion of your personal data, subject to legal and regulatory requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Objection</h3>
                <p className="text-gray-600 text-sm">
                  Object to processing of your personal data for marketing or other purposes.
                </p>
              </div>
            </div>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Processing</h3>
                <p className="text-gray-600">
                  We use Paystack for secure payment processing. Paystack's privacy policy governs their handling of your payment information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Monitoring</h3>
                <p className="text-gray-600">
                  We may use analytics services to understand usage patterns and improve our platform. These services collect anonymized data only.
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> privacy@quiika.com</p>
                <p className="text-gray-700"><strong>Address:</strong> Portharcourt, Nigeria</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We respond to privacy inquiries within 72 hours</p>
              </div>
            </div>
          </Card>

          {/* Updates */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
              We will notify users of significant changes via email or through our platform. Your continued use of our 
              services after such modifications constitutes acceptance of the updated Privacy Policy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; // Change to default export
