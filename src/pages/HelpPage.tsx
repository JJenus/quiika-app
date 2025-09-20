import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageCircle, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/seo/SEO';

export const HelpPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is a QUID?',
      answer: 'A QUID is a unique identifier for your gift transaction. It\'s generated when you create a gift and can be used to claim, track, or manage your gift. Think of it as a digital gift code.',
    },
    {
      question: 'How do I create a gift?',
      answer: 'To create a gift, go to the "Create Gift" page, enter the amount and recipient email, optionally set rules like anonymity or password protection, then complete the payment through Paystack.',
    },
    {
      question: 'How do I claim a gift?',
      answer: 'To claim a gift, go to the "Claim Gift" page and enter the QUID code you received. If the gift is password-protected, you\'ll need to enter the password as well.',
    },
    {
      question: 'What are gift rules?',
      answer: 'Gift rules allow you to customize how your gift can be claimed. You can set anonymity, password protection, time limits, nth-person claiming (e.g., every 5th person gets the gift), or split the gift among multiple recipients.',
    },
    {
      question: 'How do withdrawals work?',
      answer: 'After claiming a gift, you can withdraw the funds to your bank account. Enter your QUID, bank details, and the amount you want to withdraw. We\'ll verify your account and process the withdrawal within 24 hours.',
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, all payments are processed through Paystack, a secure and PCI-compliant payment processor. We don\'t store your payment information on our servers.',
    },
    {
      question: 'Can I cancel a gift after creating it?',
      answer: 'Once a payment is completed and a QUID is generated, gifts cannot be cancelled. However, if the gift hasn\'t been claimed within the time limit you set, it may expire and funds can be refunded.',
    },
    {
      question: 'What happens if I lose my QUID?',
      answer: 'If you lose your QUID, contact our support team with your transaction details (email, amount, approximate date). We can help you recover your QUID if you can verify ownership.',
    },
    {
      question: 'Are there any fees?',
      answer: 'We charge a small processing fee for transactions, which is clearly displayed before you complete your payment. Withdrawal fees may apply depending on your bank and location.',
    },
    {
      question: 'How long do gifts last?',
      answer: 'By default, gifts don\'t expire unless you set a specific time limit when creating the gift. However, unclaimed gifts may be subject to our terms of service regarding dormant accounts.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEO 
        config={{
          title: 'Help & Support - Quiika Digital Gift Platform',
          description: 'Get help with Quiika digital gifts, withdrawals, account management, and FAQs. Contact our support team for assistance with QUID codes and gift transactions.',
          keywords: 'quiika help, digital gift support, QUID assistance, gift withdrawal help, quiika FAQ, customer support',
          canonicalUrl: 'https://quiika.com/help',
          structuredData: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        }}
      />
      
      <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
              Help & Support
            </h1>
            <p className="text-text-secondary dark:text-text-secondary-dark">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-750">
              <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">Live Chat</h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                Get instant help from our support team
              </p>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Start Chat
              </Button>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-750">
              <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">Email Support</h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                Send us a detailed message
              </p>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Send Email
              </Button>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-750">
              <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">Phone Support</h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                Call us for urgent issues
              </p>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Call Now
              </Button>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between btn-outline dark:text-white"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-medium ">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {openFaq === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-6 py-4"
                      aria-hidden={openFaq !== index}
                    >
                      <p className="secondary dark:text-white leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-4">
                  Support Hours
                </h3>
                <div className="space-y-2 text-text-secondary dark:text-text-secondary-dark">
                  <p><strong className="text-text-primary dark:text-text-primary-dark">Monday - Friday:</strong> 9:00 AM - 6:00 PM (UTC)</p>
                  <p><strong className="text-text-primary dark:text-text-primary-dark">Saturday:</strong> 10:00 AM - 4:00 PM (UTC)</p>
                  <p><strong className="text-text-primary dark:text-text-primary-dark">Sunday:</strong> Closed</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-4">
                  Contact Details
                </h3>
                <div className="space-y-2 text-text-secondary dark:text-text-secondary-dark">
                  <p><strong className="text-text-primary dark:text-text-primary-dark">Email:</strong> support@quiika.com</p>
                  <p><strong className="text-text-primary dark:text-text-primary-dark">Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong className="text-text-primary dark:text-text-primary-dark">Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Getting Started Guide */}
          <Card className="mt-8 dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
              Getting Started Guide
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                    Create Your First Gift
                  </h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark">
                    Start by clicking "Create Gift" and entering the amount and recipient email. 
                    You can customize your gift with rules like anonymity or password protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                    Complete Payment
                  </h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark">
                    Pay securely through Paystack. Once payment is confirmed, you'll receive a unique QUID 
                    that can be shared with the recipient.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                    Share and Track
                  </h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark">
                    Share the QUID with your recipient. You can track the status of your gift 
                    in the transaction history page.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Resources */}
          <Card className="mt-8 dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
              Additional Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                  Video Tutorials
                </h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-3">
                  Watch step-by-step guides on how to use Quiika features
                </p>
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                  Watch Tutorials
                </Button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-2">
                  Community Forum
                </h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-3">
                  Connect with other users and share tips and experiences
                </p>
                <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                  Join Community
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};