import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../utils/api';
import { formatPrice } from '../../utils/helpers';

const SearchBar = ({ className = '', onClose, dark = false }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (q) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/products/search?q=${encodeURIComponent(q)}&limit=5`);
      setSuggestions(res.data.products || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product._id}`);
    setShowSuggestions(false);
    setQuery('');
    if (onClose) onClose();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center rounded-xl transition-all duration-200 ${
          dark
            ? 'glass-card border border-white/08 focus-within:border-blue-500/40'
            : 'bg-white border-2 border-gray-200 focus-within:border-blue-500 shadow-sm'
        }`}>
          <FiSearch className={`ml-3 ${dark ? 'text-white/30' : 'text-gray-400'}`} size={17} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search frames, brands..."
            className={`flex-1 px-3 py-2.5 text-sm bg-transparent outline-none ${
              dark
                ? 'text-white placeholder-white/25'
                : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setSuggestions([]); }}
              className={`mr-2 transition-colors duration-200 ${dark ? 'text-white/30 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}>
              <FiX size={15} />
            </button>
          )}
          <button type="submit"
            className="mr-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-500 transition-colors duration-200">
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
              dark ? 'glassmorphism' : 'bg-white border border-gray-100 shadow-2xl'
            }`}
          >
            {isLoading ? (
              <div className={`p-4 text-center text-sm ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                Searching...
              </div>
            ) : (
              suggestions.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left border-b last:border-0 ${
                    dark
                      ? 'border-white/05 hover:bg-white/05 text-white/80'
                      : 'border-gray-50 hover:bg-blue-50 text-gray-900'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden ${dark ? 'bg-white/05' : 'bg-gray-100'}`}>
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">🕶️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                    <p className={`text-xs ${dark ? 'text-white/40' : 'text-gray-500'}`}>{product.brand}</p>
                  </div>
                  <span className={`text-sm font-semibold ${dark ? 'text-blue-400' : 'text-blue-600'}`}>{formatPrice(product.price)}</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;

