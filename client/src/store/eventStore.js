import { create } from 'zustand'
<<<<<<< HEAD
import axios from '../lib/axiosInstance'

const useEventStore = create((set) => ({
=======
import api from '../lib/api'

const useEventStore = create((set, get) => ({
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
<<<<<<< HEAD
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
=======
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/events')
      set({ events: response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch events', isLoading: false })
    }
  },

  createEvent: async (eventData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/events', eventData)
      set(state => ({ 
        events: [response.data, ...state.events], 
        isLoading: false 
      }))
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create event'
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  rsvpEvent: async (eventId) => {
    try {
      await api.post(`/events/${eventId}/rsvp`)
      // Update the event in the store to reflect RSVP
      set(state => ({
        events: state.events.map(event => 
          event._id === eventId 
            ? { ...event, hasRSVP: true }
            : event
        )
      }))
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to RSVP'
      set({ error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  clearError: () => set({ error: null }),
}))

export default useEventStore
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
