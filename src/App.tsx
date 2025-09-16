import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CreateGiftPage } from './pages/CreateGiftPage';
import { ClaimGiftPage } from './pages/ClaimGiftPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { PaymentCallbackPage } from './pages/PaymentCallbackPage';
import { WithdrawPage } from './pages/WithdrawPage';
import { useThemeStore } from './stores/useThemeStore';

function App() {
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateGiftPage />} />
          <Route path="/claim" element={<ClaimGiftPage />} />
          <Route path="/claim/:quid" element={<ClaimGiftPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/payment/callback" element={<PaymentCallbackPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;