import { create } from 'zustand'
<<<<<<< HEAD

const useServiceStore = create((set) => ({
=======
import api from '../lib/api'

const useServiceStore = create((set, get) => ({
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
<<<<<<< HEAD
      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([
          {
            _id: '1',
            serviceName: 'Plumbing',
            description: 'Fix leaks and pipes',
            ratePerHour: 1500,
            availability: 'Weekdays',
            user: { name: 'John Doe', location: 'Nairobi' }
          },
          {
            _id: '2',
            serviceName: 'Tutoring',
            description: 'Math and Science tutoring',
            ratePerHour: 1200,
            availability: 'Weekends',
            user: { name: 'Jane Smith', location: 'Mombasa' }
          }
        ]), 1000)
      )
      set({ services: response, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  addService: async (newService) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call to add service
      await new Promise((resolve) => setTimeout(resolve, 500))
      set((state) => ({
        services: [...state.services, { ...newService, _id: Date.now().toString() }],
        isLoading: false
      }))
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false }
    }
  }
}))

export default useServiceStore
=======
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
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
