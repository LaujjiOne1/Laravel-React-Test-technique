import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Stocks from './pages/Stocks';
import AdminLayout from './layouts/AdminLayout';
import authService from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      authService.getUser().then(() => {
        setLoading(false);
      }).catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout}>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout}>
                <Products />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/stocks"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout}>
                <Stocks />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
