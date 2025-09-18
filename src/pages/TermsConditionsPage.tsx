import React from 'react';
import { FileText, AlertTriangle, DollarSign, Shield, Users, Gavel } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using Quiika's digital gifting platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your use of our website and services operated by Quiika. Our Privacy Policy also governs your use of the Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.
            </p>
          </Card>

          {/* Service Description */}
          <Card>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Service Description</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Quiika provides a digital platform that enables users to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Create and send monetary gifts with customizable rules and conditions</li>
                <li>Claim gifts using unique QUID codes</li>
                <li>Withdraw claimed funds to bank accounts</li>
                <li>Manage gift rules including time-based, nth-person, and split configurations</li>
                <li>Track transaction history and gift status</li>
              </ul>
              <p className="text-gray-600">
                Our service integrates with Paystack for secure payment processing and bank transfers.
              </p>
            </div>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Security</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Maintain the confidentiality of QUID codes and access keys</li>
                  <li>Use strong passwords for password-protected gifts</li>
                  <li>Report suspicious activity immediately</li>
                  <li>Ensure accuracy of bank account information for withdrawals</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Using the service for illegal activities or money laundering</li>
                  <li>Creating fraudulent gifts or attempting unauthorized claims</li>
                  <li>Sharing QUID codes publicly or with unintended recipients</li>
                  <li>Attempting to circumvent gift rules or security measures</li>
                  <li>Using automated systems to create or claim gifts</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
                <p className="text-gray-600">
                  Users must comply with all applicable local, state, national, and international laws and regulations when using our service.
                </p>
              </div>
            </div>
          </Card>

          {/* Financial Terms */}
          <Card>
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Financial Terms</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fees and Charges</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Transaction fees are clearly displayed before payment confirmation</li>
                  <li>Withdrawal fees may apply based on bank and location</li>
                  <li>Currency conversion fees apply for cross-border transactions</li>
                  <li>No hidden fees - all charges are transparent and disclosed upfront</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Processing</h3>
                <p className="text-gray-600 mb-2">
                  All payments are processed through Paystack, our secure payment partner. By using our service, you also agree to Paystack's terms of service.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Payments are final once confirmed</li>
                  <li>Failed payments will not generate QUID codes</li>
                  <li>Refunds are processed according to our refund policy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unclaimed Gifts</h3>
                <p className="text-gray-600">
                  Gifts that remain unclaimed for 365 days may be subject to dormancy fees or forfeiture as permitted by applicable law. We will make reasonable efforts to contact gift senders before taking such action.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Refund Policy</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Refunds are generally not available once a QUID is generated</li>
                  <li>Exceptions may be made for technical errors or fraud</li>
                  <li>Disputed transactions must be reported within 30 days</li>
                  <li>Refund processing may take 5-10 business days</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-warning mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-medium">
                IMPORTANT: Please read this section carefully as it limits our liability to you.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                To the maximum extent permitted by applicable law, Quiika shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Availability</h3>
                <p className="text-gray-600">
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for losses due to service interruptions, maintenance, or technical issues beyond our control.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-Party Services</h3>
                <p className="text-gray-600">
                  We are not responsible for the actions, content, or services of third parties, including but not limited to Paystack, banks, or other financial institutions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Maximum Liability</h3>
                <p className="text-gray-600">
                  Our total liability to you for all damages shall not exceed the amount of fees paid by you to us in the 12 months preceding the claim.
                </p>
              </div>
            </div>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </Card>

          {/* Termination */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By You</h3>
                <p className="text-gray-600">
                  You may stop using our service at any time. Outstanding gifts and transactions will remain valid according to their terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By Us</h3>
                <p className="text-gray-600">
                  We may terminate or suspend your access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Effect of Termination</h3>
                <p className="text-gray-600">
                  Upon termination, your right to use the service will cease immediately. Outstanding gifts may still be claimed by recipients, and you remain responsible for any fees or charges incurred.
                </p>
              </div>
            </div>
          </Card>

          {/* Governing Law */}
          <Card>
            <div className="flex items-center mb-4">
              <Gavel className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Governing Law and Disputes</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Applicable Law</h3>
                <p className="text-gray-600">
                  These Terms shall be interpreted and governed by the laws of Nigeria, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispute Resolution</h3>
                <p className="text-gray-600 mb-2">
                  We encourage users to contact us first to resolve any disputes. If informal resolution is not possible:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Disputes will be resolved through binding arbitration</li>
                  <li>Arbitration will be conducted in English in Nigeria</li>
                  <li>Each party will bear their own costs unless otherwise determined</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-gray-600">
              Your continued use of the service after such modifications constitutes acceptance of the updated Terms. If you do not agree to the new Terms, you must stop using the service.
            </p>
          </Card>

          {/* Contact Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> legal@quiika.com</p>
                <p className="text-gray-700"><strong>Address:</strong> Portharcourt, Nigeria</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We respond to legal inquiries within 5 business days</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};