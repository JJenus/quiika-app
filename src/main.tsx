// src/main.tsx
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';
import {LoadingSpinner} from './components/ui/LoadingSpinner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);