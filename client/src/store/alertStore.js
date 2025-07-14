import { create } from 'zustand'
import axios from '../lib/axiosInstance'

const useAlertStore = create((set) => ({
  alerts: [],
  isLoading: false,
  error: null,

  fetchAlerts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/alerts')
      set({ alerts: response.data.alerts, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  createAlert: async (alertData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/alerts', alertData)
      set((state) => ({ alerts: [response.data.alert, ...state.alerts], isLoading: false }))
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  deactivateAlert: async (alertId) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`/alerts/${alertId}/deactivate`)
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert._id !== alertId),
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  }
}))

export default useAlertStore
