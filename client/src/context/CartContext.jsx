import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart from API when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get('/cart');
      setItems(res.data.items || []);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  const addToCart = useCallback(async (product, quantity = 1, lensCustomization = null) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return false;
    }
    try {
      const payload = {
        productId: product._id,
        quantity,
      };
      if (lensCustomization) payload.lensCustomization = lensCustomization;
      const res = await api.post('/cart/add', payload);
      setItems(res.data.items || []);
      toast.success('Added to cart!');
      setIsOpen(true);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
      return false;
    }
  }, [isAuthenticated]);

  const removeFromCart = useCallback(async (itemId) => {
    try {
      const res = await api.delete(`/cart/remove/${itemId}`);
      setItems(res.data.items || []);
      toast.success('Removed from cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item');
    }
  }, []);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await api.put('/cart/update', { itemId, quantity });
      setItems(res.data.items || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update quantity');
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      await api.delete('/cart/clear');
      setItems([]);
    } catch {
      setItems([]);
    }
  }, []);

  const toggleDrawer = useCallback(() => setIsOpen(prev => !prev), []);

  const itemCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const subtotal = items.reduce((acc, item) => {
    const base = item.price || item.product?.price || 0;
    return acc + base * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isOpen,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleDrawer,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartContext;
