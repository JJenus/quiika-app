// components/seo/SEO.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOConfig, updateSEO, generateQuidSEOTags } from '../../utils/seoUtils';

interface SEOProps {
  config?: Partial<SEOConfig>;
  dynamic?: boolean;
}

export const SEO: React.FC<SEOProps> = ({ config = {}, dynamic = false }) => {
  const location = useLocation();

  useEffect(() => {
    const updateSEOTags = async () => {
      let dynamicConfig: Partial<SEOConfig> = {};

      if (dynamic) {
        // Handle dynamic SEO based on URL parameters
        const searchParams = new URLSearchParams(location.search);
        const quid = searchParams.get('quid');
        
        if (quid) {
          dynamicConfig = await generateQuidSEOTags(quid);
        }
      }

      // Merge dynamic config with provided config
      const finalConfig = { ...dynamicConfig, ...config };
      updateSEO(finalConfig);
    };

    updateSEOTags();
  }, [location, config, dynamic]);

  return null; // This component doesn't render anything
};