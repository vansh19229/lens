import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../utils/api';
import { formatPrice } from '../../utils/helpers';

const SearchBar = ({ className = '', onClose }) => {
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
        <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors shadow-sm">
          <FiSearch className="ml-3 text-gray-400" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search frames, brands, styles..."
            className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none text-gray-900 placeholder-gray-400"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setSuggestions([]); }} className="mr-2 text-gray-400 hover:text-gray-600">
              <FiX size={16} />
            </button>
          )}
          <button type="submit" className="mr-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
            ) : (
              suggestions.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">🕶️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{formatPrice(product.price)}</span>
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
