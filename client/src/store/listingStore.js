import { create } from 'zustand'
<<<<<<< HEAD
import axios from '../lib/axiosInstance'

const useListingStore = create((set) => ({
  listings: [],
=======
import api from '../lib/api'

const useListingStore = create((set, get) => ({
  listings: [],
  currentListing: null,
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
  isLoading: false,
  error: null,

  fetchListings: async () => {
<<<<<<< HEAD
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
=======
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/listings')
      set({ listings: response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch listings', isLoading: false })
    }
  },

  fetchListingById: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/listings/${id}`)
      set({ currentListing: response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch listing', isLoading: false })
    }
  },

  createListing: async (listingData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/listings', listingData)
      set(state => ({ 
        listings: [response.data, ...state.listings], 
        isLoading: false 
      }))
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create listing'
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
    }
  },

  deleteListing: async (id) => {
<<<<<<< HEAD
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
=======
    try {
      await api.delete(`/listings/${id}`)
      set(state => ({
        listings: state.listings.filter(listing => listing._id !== id)
      }))
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete listing'
      set({ error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  clearError: () => set({ error: null }),
}))

export default useListingStore
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
