// src/main.tsx
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';
import {LoadingSpinner} from './components/ui/LoadingSpinner.tsx';

// Override console methods in production
if (import.meta.env.PROD) {
  const consoleMethods = ['log', 'debug', 'warn', 'info', 'error'];
  consoleMethods.forEach((method) => {
    // @ts-ignore - We're intentionally overriding console methods
    console[method] = () => {};
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
