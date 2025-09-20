// components/seo/RouteSEO.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from './SEO';
import { getSEOConfigForPath } from '../../utils/pageSEOConfigs';

export const RouteSEO: React.FC = () => {
  const location = useLocation();
  const config = getSEOConfigForPath(location.pathname);
  
  // Check if this route needs dynamic SEO (e.g., has query parameters)
  const needsDynamicSEO = location.pathname === '/claim' && location.search.includes('quid=');
  
  return <SEO config={config} dynamic={needsDynamicSEO} />;
};