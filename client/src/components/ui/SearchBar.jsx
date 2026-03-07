import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

export default function SearchBar({ className = '', placeholder = 'Search eyewear...' }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products?search=${encodeURIComponent(query)}&limit=5`);
        setSuggestions(res.data.products || []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setFocused(false);
    }
  };

  const showDropdown = focused && (suggestions.length > 0 || loading);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={handleSearch}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
          focused
            ? 'bg-white dark:bg-slate-800 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10'
            : 'bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-800/70'
        }`}>
          <FiSearch className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSuggestions([]); }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-blue-500/25"
          >
            Search
            <FiArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50 border border-slate-200 dark:border-slate-700/50 overflow-hidden z-50"
          >
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="py-2">
                {suggestions.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => {
                      navigate(`/products/${product._id}`);
                      setQuery('');
                      setFocused(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">👓</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{product.brand} · ₹{product.price?.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
