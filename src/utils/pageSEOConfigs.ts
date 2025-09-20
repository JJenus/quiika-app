// utils/pageSEOConfigs.ts
import { SEOConfig } from './seoUtils';

export const PAGE_SEO_CONFIGS: Record<string, SEOConfig> = {
  '/': {
    title: 'Quiika - Send and Receive Digital Gifts Securely',
    description: 'Send and receive digital gifts with customizable rules. Secure money transfers with instant bank withdrawals.',
    keywords: 'send money, digital gifts, cash transfer, secure payments',
    canonicalUrl: 'https://quiika.com'
  },
  '/claim': {
    title: 'Claim Your Gift - Quiika',
    description: 'Claim your Quiika digital gift and withdraw to your bank account instantly.',
    keywords: 'claim gift, receive money, digital gift, quiika claim',
    canonicalUrl: 'https://quiika.com/claim'
  },
  '/create': {
    title: 'Send a Digital Gift - Quiika',
    description: 'Create and send digital gifts with custom rules. Perfect for birthdays, holidays, and special occasions.',
    keywords: 'send gift, digital gift, create gift, money gift',
    canonicalUrl: 'https://quiika.com/create'
  },
  '/withdraw': {
    title: 'Withdraw Funds - Quiika',
    description: 'Withdraw your Quiika gift funds directly to your bank account securely.',
    keywords: 'withdraw money, bank transfer, cash out, quiika withdrawal',
    canonicalUrl: 'https://quiika.com/withdraw'
  },
  '/rules': {
    title: 'Manage Gift Rules - Quiika',
    description: 'Set custom rules for your digital gifts including time limits, split amounts, and access conditions.',
    keywords: 'gift rules, manage gifts, custom rules, quiika rules',
    canonicalUrl: 'https://quiika.com/rules'
  },
  '/transactions': {
    title: 'Transaction History - Quiika',
    description: 'View your Quiika transaction history and track your digital gift activities.',
    keywords: 'transactions, history, gift history, quiika transactions',
    canonicalUrl: 'https://quiika.com/transactions'
  },
  '/privacy': {
    title: 'Privacy Policy - Quiika',
    description: 'Learn how Quiika protects your privacy and handles your personal information.',
    keywords: 'privacy policy, data protection, quiika privacy',
    canonicalUrl: 'https://quiika.com/privacy'
  },
  '/terms': {
    title: 'Terms and Conditions - Quiika',
    description: 'Read the terms and conditions for using Quiika digital gift services.',
    keywords: 'terms and conditions, user agreement, quiika terms',
    canonicalUrl: 'https://quiika.com/terms'
  },
  '/cookies': {
    title: 'Cookie Policy - Quiika',
    description: 'Understand how Quiika uses cookies to enhance your experience.',
    keywords: 'cookie policy, cookies, quiika cookies',
    canonicalUrl: 'https://quiika.com/cookies'
  },
  '/help': {
    title: 'Help Center - Quiika',
    description: 'Get help with Quiika digital gifts, withdrawals, and account management.',
    keywords: 'help center, support, faq, quiika help',
    canonicalUrl: 'https://quiika.com/help'
  }
};

export const getSEOConfigForPath = (pathname: string): SEOConfig => {
  return PAGE_SEO_CONFIGS[pathname] || {
    title: 'Quiika - Send and Receive Digital Gifts Securely',
    description: 'Quiika allows you to send and receive digital gifts with customizable rules.',
    canonicalUrl: `https://quiika.com${pathname}`
  };
};