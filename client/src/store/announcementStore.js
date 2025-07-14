import { create } from 'zustand'
import api from '../lib/api'

const useAnnouncementStore = create((set) => ({
  announcements: [],
  isLoading: false,
  error: null,

  fetchAnnouncements: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/announcements')
      set({ announcements: response.data.announcements || response.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false })
    }
  },

  createAnnouncement: async (announcementData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/announcements', announcementData)
      set((state) => ({ 
        announcements: [response.data.announcement || response.data, ...state.announcements], 
        isLoading: false 
      }))
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      set({ error: errorMessage, isLoading: false })
      return { success: false, error: errorMessage }
    }
  },

  deactivateAnnouncement: async (announcementId) => {
    set({ isLoading: true, error: null })
    try {
      await api.put(`/announcements/${announcementId}/deactivate`)
      set((state) => ({
        announcements: state.announcements.filter((a) => a._id !== announcementId),
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

export default useAnnouncementStore
