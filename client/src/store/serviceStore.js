import { create } from 'zustand'
import api from '../lib/api'

const useServiceStore = create((set, get) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/services')
      set({ services: response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch services', isLoading: false })
    }
  },

  addService: async (serviceData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/services', serviceData)
      set(state => ({ 
        services: [response.data, ...state.services], 
        isLoading: false 
      }))
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add service'
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  clearError: () => set({ error: null }),
}))

export default useServiceStore