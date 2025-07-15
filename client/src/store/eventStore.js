import { create } from 'zustand'
import api from '../lib/api'
import useAuthStore from './authStore'

const useEventStore = create((set) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/events')
      const currentUser = useAuthStore.getState().user
      const eventsWithRSVP = response.data.map(event => ({
        ...event,
        hasRSVP: event.attendees.some(attendee => attendee === currentUser?._id)
      }))
      set({ events: eventsWithRSVP, isLoading: false })
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
