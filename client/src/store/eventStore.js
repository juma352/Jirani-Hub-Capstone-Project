import { create } from 'zustand'
import axios from '../lib/axiosInstance'

const useEventStore = create((set) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/events');
      set({ events: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  createEvent: async (newEvent) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/events', newEvent);
      set((state) => ({
        events: [...state.events, response.data],
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false })
      return { success: false }
    }
  }
}))

export default useEventStore
