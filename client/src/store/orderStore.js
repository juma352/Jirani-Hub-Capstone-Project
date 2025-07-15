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
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      return { success: false, error: error.response?.data?.message || error.message };
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
    try {
      const response = await axios.get(`/orders/${orderId}`);
      order = response.data;
      set((state) => ({
        orders: [...state.orders, order]
      }));
      return order;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      return null;
    }
  },
}));

export default useOrderStore;
