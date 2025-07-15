import { create } from 'zustand'

const useServiceStore = create((set) => ({

  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {

      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([
          {
            _id: '1',
            serviceName: 'Plumbing',
            description: 'Fix leaks and pipes',
            ratePerHour: 1500,
            availability: 'Weekdays',
            user: { _id: 'u1', name: 'John Doe', location: 'Nairobi' }
          },
          {
            _id: '2',
            serviceName: 'Tutoring',
            description: 'Math and Science tutoring',
            ratePerHour: 1200,
            availability: 'Weekends',
            user: { _id: 'u2', name: 'Jane Smith', location: 'Mombasa' }
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

