import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown, FiLogOut, FiPackage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import SearchBar from '../ui/SearchBar';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, toggleDrawer } = useCart();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? 'glassmorphism shadow-lg py-2' : 'bg-white py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">👁</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Lens Master
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 ml-4">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>

            <div
              className="relative"
              onMouseEnter={() => setShowProductsMenu(true)}
              onMouseLeave={() => setShowProductsMenu(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Products <FiChevronDown size={14} className={`transition-transform ${showProductsMenu ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showProductsMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <Link
                      to="/products?category=eyeglasses"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setShowProductsMenu(false)}
                    >
                      <span>👓</span> Eyeglasses
                    </Link>
                    <Link
                      to="/products?category=sunglasses"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setShowProductsMenu(false)}
                    >
                      <span>🕶️</span> Sunglasses
                    </Link>
                    <Link
                      to="/products?category=contact-lenses"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setShowProductsMenu(false)}
                    >
                      <span>🔵</span> Contact Lenses
                    </Link>
                    <Link
                      to="/products"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-600 transition-colors border-t border-gray-50"
                      onClick={() => setShowProductsMenu(false)}
                    >
                      All Products →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* Search Bar (desktop) */}
          <div className="hidden lg:block flex-1 max-w-xs mx-4">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search icon (mobile) */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={toggleDrawer}
              className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[80px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <FiChevronDown size={14} className="text-gray-400" />
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700">
                        <FiUser size={14} /> My Profile
                      </Link>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700">
                        <FiPackage size={14} /> My Orders
                      </Link>
                      <hr className="border-gray-100" />
                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 w-full text-left">
                        <FiLogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden px-4 pb-3 overflow-hidden"
            >
              <SearchBar onClose={() => setShowSearch(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1">
                <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600">All Products</Link>
                <Link to="/products?category=eyeglasses" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-600 pl-4 hover:text-blue-600">👓 Eyeglasses</Link>
                <Link to="/products?category=sunglasses" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-600 pl-4 hover:text-blue-600">🕶️ Sunglasses</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600">About</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600">Contact</Link>
                {!isAuthenticated ? (
                  <div className="flex gap-2 pt-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 text-sm font-medium text-center border border-blue-600 text-blue-600 rounded-xl">Login</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 text-sm font-semibold text-center bg-blue-600 text-white rounded-xl">Register</Link>
                  </div>
                ) : (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600">My Profile</Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block py-2.5 text-sm font-medium text-red-600 w-full text-left">Logout</button>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
