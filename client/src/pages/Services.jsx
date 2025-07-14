<<<<<<< HEAD


import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Wrench, Plus } from 'lucide-react'
import useServiceStore from '../store/serviceStore'
import { formatCurrency } from '../lib/utils'
import useChatStore from '../store/chatStore'
import { useNavigate } from 'react-router-dom'
=======
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Search, Wrench, Plus } from 'lucide-react'
import useServiceStore from '../store/serviceStore'
import { formatCurrency } from '../lib/utils'
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb

const Services = () => {
  const { services, fetchServices, isLoading } = useServiceStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
<<<<<<< HEAD
  const chatStore = useChatStore()
  const { fetchOrCreateChat } = chatStore
  const navigate = useNavigate()
=======
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

<<<<<<< HEAD
  const handleContactProvider = async (providerId, listingId) => {
    const userId = chatStore.currentUserId // You may need to get current user ID from auth store or context
    await fetchOrCreateChat(listingId, [userId, providerId])
    navigate('/chat') // Adjust route as per your chat UI
  }

=======
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
  const filteredServices = services.filter(service =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Local Services</h1>
          <p className="text-gray-600">Find trusted service providers in your neighborhood</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Offer Service
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredServices.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No services found</h3>
              <p>Be the first to offer your services to the community!</p>
              <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                Offer First Service
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{service.serviceName}</CardTitle>
                <CardDescription>
                  by {service.user?.name} • {service.user?.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 line-clamp-3">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Rate per hour</p>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(service.ratePerHour)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="text-sm font-medium capitalize">
                      {service.availability || 'Contact for details'}
                    </p>
                  </div>
                </div>

<<<<<<< HEAD
                <Button
                  className="w-full"
                  onClick={() => handleContactProvider(service.user._id, service._id)}
                >
=======
                <Button className="w-full">
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
                  Contact Provider
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showAddForm && <AddServiceForm onClose={() => setShowAddForm(false)} />}
    </div>
  )
}

const AddServiceForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    ratePerHour: '',
    availability: ''
  })
  const { addService, isLoading, error } = useServiceStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await addService({
      ...formData,
      ratePerHour: parseFloat(formData.ratePerHour)
    })
    if (result.success) {
      onClose()
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Offer Your Service</CardTitle>
          <CardDescription>
            Let your neighbors know what services you provide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Service Name *</label>
              <Input
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                required
                placeholder="e.g., Plumbing, Tutoring, Cleaning"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service and experience..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rate per Hour (KES) *</label>
              <Input
                name="ratePerHour"
                type="number"
                min="0"
                step="0.01"
                value={formData.ratePerHour}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Input
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g., Weekdays, Weekends, Flexible"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Adding...' : 'Add Service'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Services