// utils/seoUtils.ts
export interface SEOConfig {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
    structuredData?: object;
    noIndex?: boolean;
  }
  
  export const DEFAULT_SEO_CONFIG: SEOConfig = {
    title: 'Quiika - Send and Receive Digital Gifts Securely',
    description: 'Quiika allows you to send and receive digital gifts with customizable rules. Secure money transfers with instant bank withdrawals.',
    keywords: 'digital gifts, money transfer, cash gifts, quiika, secure payments, gift cards',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    ogImage: '/og-image.png'
  };
  
  export const updateSEO = (config: Partial<SEOConfig>): void => {
    const fullConfig = { ...DEFAULT_SEO_CONFIG, ...config };
    
    // Update title
    document.title = fullConfig.title;
    
    // Update meta tags
    updateMetaTag('description', fullConfig.description);
    updateMetaTag('keywords', fullConfig.keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', fullConfig.title, 'property');
    updateMetaTag('og:description', fullConfig.description, 'property');
    updateMetaTag('og:type', fullConfig.ogType, 'property');
    updateMetaTag('og:image', fullConfig.ogImage, 'property');
    
    // Update Twitter tags
    updateMetaTag('twitter:title', fullConfig.title);
    updateMetaTag('twitter:description', fullConfig.description);
    updateMetaTag('twitter:card', fullConfig.twitterCard);
    
    // Update canonical URL
    updateCanonicalUrl(fullConfig.canonicalUrl);
    
    // Update robots meta tag
    updateMetaTag('robots', fullConfig.noIndex ? 'noindex, nofollow' : 'index, follow');
    
    // Add structured data
    if (fullConfig.structuredData) {
      addStructuredData(fullConfig.structuredData);
    }
  };
  
  const updateMetaTag = (name: string, content: string | undefined, attribute: 'name' | 'property' = 'name'): void => {
    if (!content) return;
    
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    
    tag.setAttribute('content', content);
  };
  
  const updateCanonicalUrl = (url?: string): void => {
    if (!url) return;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    canonical.setAttribute('href', url);
  };
  
  const addStructuredData = (data: object): void => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script, index) => {
      if (index > 0) script.remove(); // Keep the first one (base structured data)
    });
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };
  
  export const generateQuidSEOTags = async (quid: string): Promise<Partial<SEOConfig>> => {
    try {
      // Fetch Quid details from API (you would replace this with your actual API call)
      // const response = await fetch(`/api/quid/${quid}`);
      // const quidData = await response.json();
      
      // For demo purposes, we'll use mock data
      const quidData = {
        amount: 5000,
        currency: 'NGN',
        status: 'ACTIVE'
      };
      
      const amountFormatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: quidData.currency,
      }).format(quidData.amount / 100);
      
      return {
        title: `Claim Your ${amountFormatted} Gift on Quiika`,
        description: `You've received a ${amountFormatted} digital gift! Claim your Quiika gift now and withdraw to your bank account instantly.`,
        keywords: `claim gift, ${amountFormatted}, quiika gift, digital money gift`,
        canonicalUrl: `https://quiika.com/claim?quid=${quid}`,
        ogImage: `/og-gift.png?amount=${quidData.amount}&currency=${quidData.currency}`,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Offer",
          "name": "Digital Gift",
          "description": `A ${amountFormatted} digital gift available for claim`,
          "price": quidData.amount / 100,
          "priceCurrency": quidData.currency,
          "availability": quidData.status === 'ACTIVE' ? 
            "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": `https://quiika.com/claim?quid=${quid}`
        }
      };
    } catch (error) {
      console.error('Error generating SEO tags for Quid:', error);
      return {
        title: 'Claim Your Digital Gift on Quiika',
        description: 'Claim your Quiika digital gift and withdraw to your bank account instantly.'
      };
    }
  };