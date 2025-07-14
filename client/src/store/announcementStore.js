import { create } from 'zustand'
import axios from '../lib/axiosInstance'

const useAnnouncementStore = create((set) => ({
  announcements: [],
  isLoading: false,
  error: null,

  fetchAnnouncements: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/announcements')
      set({ announcements: response.data.announcements, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  createAnnouncement: async (announcementData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/announcements', announcementData)
      set((state) => ({ announcements: [response.data.announcement, ...state.announcements], isLoading: false }))
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  deactivateAnnouncement: async (announcementId) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`/announcements/${announcementId}/deactivate`)
      set((state) => ({
        announcements: state.announcements.filter((a) => a._id !== announcementId),
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  }
}))

export default useAnnouncementStore
