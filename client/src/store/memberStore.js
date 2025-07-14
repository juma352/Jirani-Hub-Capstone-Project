import { create } from 'zustand'
import axios from '../lib/axiosInstance'

const useMemberStore = create((set) => ({
  members: [],
  isLoading: false,
  error: null,

  fetchMembers: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('/members')
      set({ members: response.data.members, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  }
}))

export default useMemberStore
