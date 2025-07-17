import { create } from 'zustand';
import axios from '../lib/axiosInstance';

const useOrderStore = create((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  placeOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/orders', orderData);
      set((state) => ({
        orders: [...state.orders, response.data],
        isLoading: false,
      }));
      return { success: true, order: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/orders');
      set({ orders: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  getOrderById: async (orderId) => {
    const state = get();
    let order = state.orders.find(o => o._id === orderId);
    if (order) {
      return order;
    }
    
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/orders/${orderId}`);
      order = response.data;
      set((state) => ({
        orders: [...state.orders.filter(o => o._id !== orderId), order],
        isLoading: false
      }));
      return order;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, isLoading: false });
      return null;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`/orders/${orderId}/status`, { status });
      set((state) => ({
        orders: state.orders.map(order => 
          order._id === orderId ? { ...order, status } : order
        ),
        isLoading: false
      }));
      return { success: true, order: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  clearError: () => set({ error: null }),
}));

export default useOrderStore;