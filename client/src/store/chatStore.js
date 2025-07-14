import { create } from 'zustand'
import axios from '../lib/axiosInstance'

const useChatStore = create((set) => ({
  chats: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  error: null,

  fetchOrCreateChat: async (listingId, participantIds) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/chats/get-or-create', { listingId, participantIds })
      set({ currentChat: response.data.chat, messages: response.data.chat.messages, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  sendMessage: async (chatId, senderId, message) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post('/chats/add-message', { chatId, senderId, message })
      set({ messages: response.data.chat.messages, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  fetchMessages: async (chatId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`/chats/${chatId}/messages`)
      set({ messages: response.data.messages, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  }
}))

export default useChatStore
