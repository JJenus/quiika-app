import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppInitialization } from './hooks/useAppInitialization';
import { 
  publicRoutes, 
  legalRoutes, 
  adminRoutes, 
  specialRoutes 
} from './config/routes';
import { generateRoutes } from './utils/routeGenerator';

function App() {
  const { initialize } = useAppInitialization();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          {generateRoutes([...publicRoutes, ...legalRoutes])}
          
          {/* Special Routes (no layout) */}
          {generateRoutes(specialRoutes)}
          
          {/* Admin Routes */}
          {generateRoutes(adminRoutes)}

          {/* Admin redirect */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;