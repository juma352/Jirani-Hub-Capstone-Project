import { create } from 'zustand'
import api from '../lib/api'

const useListingStore = create((set, get) => ({
  listings: [],
  currentListing: null,
  isLoading: false,
  error: null,

  fetchListings: async () => {
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
    }
  },

  deleteListing: async (id) => {
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