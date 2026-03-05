import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import PriceRangeSlider from '../components/ui/PriceRangeSlider';
import Breadcrumb from '../components/ui/Breadcrumb';
import api from '../utils/api';

const CATEGORIES = ['eyeglasses', 'sunglasses', 'contact-lenses'];
const BRANDS = ['Ray-Ban', 'Oakley', 'Titan', 'Fastrack', 'Lenskart', 'Vincent Chase'];
const FRAME_TYPES = ['Full Rim', 'Half Rim', 'Rimless'];
const FRAME_SHAPES = ['Rectangle', 'Round', 'Square', 'Oval', 'Cat Eye', 'Aviator', 'Wayfarer'];
const GENDERS = ['men', 'women', 'unisex'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <FiChevronDown className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} size={16} />
      </button>
      {open && children}
    </div>
  );
};

const CheckboxFilter = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer group py-1">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize">{label}</span>
  </label>
);

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brands: searchParams.getAll('brand'),
    frameTypes: searchParams.getAll('frameType'),
    frameShapes: searchParams.getAll('frameShape'),
    genders: searchParams.getAll('gender'),
    minPrice: parseInt(searchParams.get('minPrice') || '0'),
    maxPrice: parseInt(searchParams.get('maxPrice') || '10000'),
    sort: searchParams.get('sort') || 'newest',
  };

  const updateFilter = (key, value, multi = false) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (multi) {
      const existing = params.getAll(key);
      if (existing.includes(value)) {
        params.delete(key);
        existing.filter(v => v !== value).forEach(v => params.append(key, v));
      } else {
        params.append(key, value);
      }
    } else {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({ page: '1' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        if (filters.category) params.set('category', filters.category);
        filters.brands.forEach(b => params.append('brand', b));
        filters.frameTypes.forEach(f => params.append('frameType', f));
        filters.frameShapes.forEach(f => params.append('frameShape', f));
        filters.genders.forEach(g => params.append('gender', g));
        if (filters.minPrice > 0) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice < 10000) params.set('maxPrice', filters.maxPrice);
        params.set('sort', filters.sort);
        params.set('page', page);
        params.set('limit', limit);
        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data.products || []);
        setTotal(res.data.total || 0);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const totalPages = Math.ceil(total / limit);
  const hasActiveFilters = filters.category || filters.brands.length || filters.frameTypes.length ||
    filters.genders.length || filters.minPrice > 0 || filters.maxPrice < 10000;

  const FilterPanel = () => (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-blue-600 font-medium hover:underline">Clear All</button>
        )}
      </div>
      <FilterSection title="Category">
        {CATEGORIES.map(c => (
          <CheckboxFilter
            key={c}
            label={c.replace('-', ' ')}
            checked={filters.category === c}
            onChange={() => updateFilter('category', filters.category === c ? '' : c)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Brand">
        {BRANDS.map(b => (
          <CheckboxFilter
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => updateFilter('brand', b, true)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Frame Type">
        {FRAME_TYPES.map(f => (
          <CheckboxFilter
            key={f}
            label={f}
            checked={filters.frameTypes.includes(f)}
            onChange={() => updateFilter('frameType', f, true)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Frame Shape">
        {FRAME_SHAPES.map(f => (
          <CheckboxFilter
            key={f}
            label={f}
            checked={filters.frameShapes.includes(f)}
            onChange={() => updateFilter('frameShape', f, true)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Gender">
        {GENDERS.map(g => (
          <CheckboxFilter
            key={g}
            label={g}
            checked={filters.genders.includes(g)}
            onChange={() => updateFilter('gender', g, true)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Price Range">
        <PriceRangeSlider
          min={0}
          max={10000}
          value={[filters.minPrice, filters.maxPrice]}
          onChange={([min, max]) => {
            const params = new URLSearchParams(searchParams);
            params.set('minPrice', min);
            params.set('maxPrice', max);
            params.set('page', '1');
            setSearchParams(params);
          }}
        />
      </FilterSection>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: filters.category ? filters.category.replace('-', ' ') : 'All Products' },
      ]} />

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {filters.category ? filters.category.replace('-', ' ') : 'All Products'}
                {filters.search && <span className="text-gray-400 text-lg"> — "{filters.search}"</span>}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">{total} results found</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium"
              >
                <FiFilter size={16} /> Filters
                {hasActiveFilters && <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>}
              </button>
              <select
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.category && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  {filters.category}
                  <button onClick={() => updateFilter('category', '')}><FiX size={12} /></button>
                </span>
              )}
              {filters.brands.map(b => (
                <span key={b} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  {b}<button onClick={() => updateFilter('brand', b, true)}><FiX size={12} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Array(limit).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your filters or search term</p>
              <button onClick={clearFilters} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', p);
                    setSearchParams(params);
                  }}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    p === page ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilter(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <FiX size={20} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setShowMobileFilter(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold mt-4"
            >
              View {total} Results
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Products;
