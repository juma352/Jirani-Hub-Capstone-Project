import { create } from 'zustand'
import axios from '../lib/axiosInstance'

const useListingStore = create((set) => ({
  listings: [],
  isLoading: false,
  error: null,

  fetchListings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/listings');
      set({ listings: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  createListing: async (newListing) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/listings', newListing);
      set((state) => ({
        listings: [...state.listings, response.data],
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false })
      return { success: false }
    }
  },

  deleteListing: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/listings/${id}`);
      set((state) => ({
        listings: state.listings.filter(listing => listing._id !== id),
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      return { success: false };
    }
  },

  updateListing: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`/listings/${id}`, updatedData);
      set((state) => ({
        listings: state.listings.map(listing => listing._id === id ? response.data : listing),
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      return { success: false };
    }
  }
}))

export default useListingStore
