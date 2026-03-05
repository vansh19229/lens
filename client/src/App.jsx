import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex">
    {/* Admin Sidebar */}
    <aside className="w-56 bg-gray-900 text-white flex-shrink-0 min-h-screen">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-sm">👁</div>
          <span className="font-bold">Lens Admin</span>
        </div>
      </div>
      <nav className="p-3 space-y-1">
        {[
          { href: '/admin', label: '📊 Dashboard' },
          { href: '/admin/products', label: '👓 Products' },
          { href: '/admin/orders', label: '📦 Orders' },
          { href: '/admin/users', label: '👥 Users' },
        ].map(({ href, label }) => (
          <a key={href} href={href} className="block px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            {label}
          </a>
        ))}
        <hr className="border-gray-800 my-2" />
        <a href="/" className="block px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          ← Back to Store
        </a>
      </nav>
    </aside>
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
);

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <CartDrawer />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Admin routes - standalone layout */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProducts /></AdminLayout></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrders /></AdminLayout></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />

      {/* Auth pages - no nav/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public pages */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
      <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Protected pages */}
      <Route path="/cart" element={<PublicLayout><ProtectedRoute><Cart /></ProtectedRoute></PublicLayout>} />
      <Route path="/checkout" element={<PublicLayout><ProtectedRoute><Checkout /></ProtectedRoute></PublicLayout>} />
      <Route path="/profile" element={<PublicLayout><ProtectedRoute><Profile /></ProtectedRoute></PublicLayout>} />
      <Route path="/orders/:id" element={<PublicLayout><ProtectedRoute><OrderDetail /></ProtectedRoute></PublicLayout>} />

      {/* 404 */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' },
              success: { style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' } },
              error: { style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' } },
            }}
          />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
