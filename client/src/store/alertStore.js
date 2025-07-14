import { create } from 'zustand'
import api from '../lib/api'

const useAlertStore = create((set) => ({
  alerts: [],
  isLoading: false,
  error: null,

  fetchAlerts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/alerts')
      set({ alerts: response.data.alerts || response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false })
    }
  },

  createAlert: async (alertData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/alerts', alertData)
      set((state) => ({ 
        alerts: [response.data.alert || response.data, ...state.alerts], 
        isLoading: false 
      }))
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  deactivateAlert: async (alertId) => {
    set({ isLoading: true, error: null })
    try {
      await api.put(`/alerts/${alertId}/deactivate`)
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert._id !== alertId),
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  clearError: () => set({ error: null }),
}))

export default useAlertStore
