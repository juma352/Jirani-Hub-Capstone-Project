import { create } from 'zustand';
import axios from '../lib/axiosInstance';

const useOrderStore = create((set) => ({
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
      return { success: true };
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
}));

export default useOrderStore;
