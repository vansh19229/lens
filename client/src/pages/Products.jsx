import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown, FiSliders, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import PriceRangeSlider from '../components/ui/PriceRangeSlider';
import api from '../utils/api';

const categories = ['eyeglasses', 'sunglasses', 'contact-lenses'];
const brands = ['Ray-Ban', 'Oakley', 'Titan', 'Fastrack', 'Lenskart', 'Vogue', 'Polaroid'];
const frameTypes = ['Full Rim', 'Half Rim', 'Rimless'];
const frameShapes = ['Rectangle', 'Round', 'Square', 'Oval', 'Cat Eye', 'Aviator', 'Wayfarer'];
const genders = ['Men', 'Women', 'Unisex'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

const CheckboxItem = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div
      onClick={onChange}
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
        checked
          ? 'bg-blue-600 border-blue-600'
          : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400'
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors capitalize">
      {label}
    </span>
  </label>
);

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    brands: [],
    frameTypes: [],
    frameShapes: [],
    genders: [],
    priceRange: [0, 10000],
    sort: searchParams.get('sort') || 'newest',
    page: 1,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      if (filters.brands.length) params.set('brand', filters.brands.join(','));
      if (filters.frameTypes.length) params.set('frameType', filters.frameTypes.join(','));
      if (filters.frameShapes.length) params.set('frameShape', filters.frameShapes.join(','));
      if (filters.genders.length) params.set('gender', filters.genders.join(','));
      params.set('minPrice', filters.priceRange[0]);
      params.set('maxPrice', filters.priceRange[1]);
      params.set('sort', filters.sort);
      params.set('page', filters.page);
      params.set('limit', 12);
      const res = await api.get(`/products?${params}`);
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalProducts(res.data.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleMulti = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value],
      page: 1,
    }));
  };

  const setCategory = (cat) => setFilters(prev => ({ ...prev, category: prev.category === cat ? '' : cat, page: 1 }));
  const setSort = (sort) => setFilters(prev => ({ ...prev, sort, page: 1 }));
  const setPriceRange = (range) => setFilters(prev => ({ ...prev, priceRange: range, page: 1 }));
  const setPage = (page) => setFilters(prev => ({ ...prev, page }));
  const clearAll = () => setFilters({ category: '', search: '', brands: [], frameTypes: [], frameShapes: [], genders: [], priceRange: [0, 10000], sort: 'newest', page: 1 });

  const activeFilterCount = [
    filters.category ? 1 : 0,
    filters.brands.length,
    filters.frameTypes.length,
    filters.frameShapes.length,
    filters.genders.length,
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-1 mb-3"
        >
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{title}</span>
          <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && <div className="space-y-2.5">{children}</div>}
      </div>
    );
  };

  const FilterContent = () => (
    <div className="space-y-0">
      <FilterSection title="Category">
        {categories.map(cat => (
          <CheckboxItem
            key={cat}
            checked={filters.category === cat}
            onChange={() => setCategory(cat)}
            label={cat.replace('-', ' ')}
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map(brand => (
          <CheckboxItem
            key={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => toggleMulti('brands', brand)}
            label={brand}
          />
        ))}
      </FilterSection>

      <FilterSection title="Frame Type" defaultOpen={false}>
        {frameTypes.map(ft => (
          <CheckboxItem
            key={ft}
            checked={filters.frameTypes.includes(ft)}
            onChange={() => toggleMulti('frameTypes', ft)}
            label={ft}
          />
        ))}
      </FilterSection>

      <FilterSection title="Frame Shape" defaultOpen={false}>
        {frameShapes.map(fs => (
          <CheckboxItem
            key={fs}
            checked={filters.frameShapes.includes(fs)}
            onChange={() => toggleMulti('frameShapes', fs)}
            label={fs}
          />
        ))}
      </FilterSection>

      <FilterSection title="Gender" defaultOpen={false}>
        {genders.map(g => (
          <CheckboxItem
            key={g}
            checked={filters.genders.includes(g)}
            onChange={() => toggleMulti('genders', g)}
            label={g}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen={false}>
        <PriceRangeSlider
          value={filters.priceRange}
          onChange={setPriceRange}
        />
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {filters.category ? filters.category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'All Products'}
                {filters.search && <span className="text-slate-500 dark:text-slate-400 font-normal ml-2">for "{filters.search}"</span>}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {loading ? 'Loading...' : `${totalProducts} products found`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                >
                  {sortOptions.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <FiSliders className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-medium">
                  {filters.category}
                  <button onClick={() => setCategory(filters.category)}><FiX className="w-3 h-3" /></button>
                </span>
              )}
              {[...filters.brands, ...filters.frameTypes, ...filters.frameShapes, ...filters.genders].map(f => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium">
                  {f}
                  <button onClick={() => {
                    if (filters.brands.includes(f)) toggleMulti('brands', f);
                    else if (filters.frameTypes.includes(f)) toggleMulti('frameTypes', f);
                    else if (filters.frameShapes.includes(f)) toggleMulti('frameShapes', f);
                    else toggleMulti('genders', f);
                  }}><FiX className="w-3 h-3" /></button>
                </span>
              ))}
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-red-600 dark:text-red-400 text-xs font-medium hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiFilter className="w-4 h-4" />
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium">
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product, i) => (
                    <ProductCard key={product._id} product={product} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(Math.max(1, filters.page - 1))}
                      disabled={filters.page === 1}
                      className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                          filters.page === i + 1
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, filters.page + 1))}
                      disabled={filters.page === totalPages}
                      className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiFilter className="w-4 h-4" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                <FilterContent />
              </div>
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <button
                  onClick={() => { clearAll(); setMobileFiltersOpen(false); }}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Clear
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
