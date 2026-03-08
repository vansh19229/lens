import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown, FiLogOut, FiPackage, FiSearch } from 'react-icons/fi';
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
    `relative text-sm font-medium transition-colors duration-200 group ${
      isActive ? 'text-white' : 'text-white/60 hover:text-white'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          scrolled
            ? 'glassmorphism shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_28px_rgba(99,102,241,0.6)] transition-all duration-300">
              <span className="text-white text-xl">👁</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Lens<span className="text-blue-400">Master</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 ml-6">
            <NavLink to="/" className={navLinkClass} end>
              {({ isActive }) => (
                <>
                  Home
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setShowProductsMenu(true)}
              onMouseLeave={() => setShowProductsMenu(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                Products
                <FiChevronDown size={13} className={`transition-transform duration-200 ${showProductsMenu ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showProductsMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-3 w-52 glassmorphism rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                  >
                    {[
                      { to: '/products?category=eyeglasses', emoji: '👓', label: 'Eyeglasses' },
                      { to: '/products?category=sunglasses', emoji: '🕶️', label: 'Sunglasses' },
                      { to: '/products?category=contact-lenses', emoji: '🔵', label: 'Contact Lenses' },
                    ].map(({ to, emoji, label }) => (
                      <Link
                        key={label}
                        to={to}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/08 transition-all duration-150"
                        onClick={() => setShowProductsMenu(false)}
                      >
                        <span className="text-base">{emoji}</span> {label}
                      </Link>
                    ))}
                    <div className="border-t border-white/08">
                      <Link
                        to="/products"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-blue-400 hover:text-blue-300 hover:bg-white/05 transition-all duration-150"
                        onClick={() => setShowProductsMenu(false)}
                      >
                        View All Products →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  About
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Contact
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          </nav>

          {/* Search Bar (desktop) */}
          <div className="hidden lg:block flex-1 max-w-xs mx-4">
            <SearchBar dark />
          </div>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-1">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/08 transition-all duration-200"
            >
              <FiSearch size={18} />
            </button>

            {/* Cart */}
            <button
              onClick={toggleDrawer}
              className="relative p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/08 transition-all duration-200"
            >
              <FiShoppingCart size={19} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-blue-500 text-white text-[10px] rounded-full w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center font-bold shadow-[0_0_10px_rgba(59,130,246,0.6)]"
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
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/08 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-white/80 max-w-[80px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <FiChevronDown size={13} className="text-white/40" />
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-3 w-48 glassmorphism rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/08 transition-all">
                        <FiUser size={14} /> My Profile
                      </Link>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/08 transition-all">
                        <FiPackage size={14} /> My Orders
                      </Link>
                      <div className="border-t border-white/08">
                        <button onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/08 w-full text-left transition-all">
                          <FiLogOut size={14} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <Link to="/login"
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 btn-glow transition-all duration-200">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/08 transition-all duration-200 ml-1"
            >
              {mobileOpen ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden px-4 pb-3 overflow-hidden"
            >
              <SearchBar dark onClose={() => setShowSearch(false)} />
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
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/08 glassmorphism overflow-hidden"
            >
              <nav className="px-4 py-4 space-y-1">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'All Products' },
                  { to: '/products?category=eyeglasses', label: '👓 Eyeglasses' },
                  { to: '/products?category=sunglasses', label: '🕶️ Sunglasses' },
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <Link key={label} to={to} onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/05 rounded-xl transition-all duration-150">
                    {label}
                  </Link>
                ))}
                {!isAuthenticated ? (
                  <div className="flex gap-2 pt-3 pb-1">
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2.5 text-sm font-medium text-center border border-white/15 text-white/80 rounded-xl hover:bg-white/05 transition-all">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2.5 text-sm font-semibold text-center bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all">
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-3 text-sm font-medium text-white/70 hover:text-white rounded-xl transition-all">
                      My Profile
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="block py-2.5 px-3 text-sm font-medium text-red-400 hover:text-red-300 w-full text-left rounded-xl transition-all">
                      Logout
                    </button>
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

