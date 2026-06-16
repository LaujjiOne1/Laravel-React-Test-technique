import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

function AdminLayout({ children, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authService.logout();
      authService.removeToken();
      localStorage.removeItem('user');
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Biloki</h1>
          <p className="text-blue-200 text-sm mt-1">Admin Dashboard</p>
        </div>

        <nav className="mt-6">
          <Link
            to="/"
            className={`block px-6 py-3 text-white hover:bg-blue-700 transition ${
              isActive('/') || isActive('')
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            className={`block px-6 py-3 text-white hover:bg-blue-700 transition ${
              isActive('/products')
            }`}
          >
            Products
          </Link>
          <Link
            to="/stocks"
            className={`block px-6 py-3 text-white hover:bg-blue-700 transition ${
              isActive('/stocks')
            }`}
          >
            Stock Management
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
