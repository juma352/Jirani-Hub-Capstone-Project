import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useAlertStore from '../store/alertStore'
import useAuthStore from '../providers/useAuthStore'
import { 
  AlertTriangle, 
  Bell, 
  Plus, 
  Search, 
  Filter,
  Clock,
  User,
  MapPin,
  Eye,
  EyeOff,
  Trash2,
  Edit
} from 'lucide-react'
import { formatDate } from '../lib/utils'

const AlertSystem = () => {
  const { user } = useAuthStore()
  const { alerts, fetchAlerts, createAlert, deactivateAlert, isLoading, error } = useAlertStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    isUrgent: false,
    category: 'general',
    location: ''
  })

  const categories = [
    { value: 'general', label: 'General', color: 'bg-blue-100 text-blue-800' },
    { value: 'security', label: 'Security', color: 'bg-red-100 text-red-800' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'event', label: 'Event', color: 'bg-green-100 text-green-800' },
    { value: 'weather', label: 'Weather', color: 'bg-purple-100 text-purple-800' },
    { value: 'traffic', label: 'Traffic', color: 'bg-orange-100 text-orange-800' }
  ]

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await createAlert({
      ...formData,
      location: formData.location || user?.location
    })
    if (result.success) {
      setShowCreateDialog(false)
      setFormData({ title: '', message: '', isUrgent: false, category: 'general', location: '' })
    }
  }

  const handleDeactivate = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this alert?')) {
      await deactivateAlert(id)
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'urgent' && alert.isUrgent) ||
                         (filterType === 'category' && alert.category === 'security')
    return matchesSearch && matchesFilter
  })

  const getCategoryStyle = (category) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.color : 'bg-gray-100 text-gray-800'
  }

  const canCreateAlert = user?.role === 'admin' || user?.role === 'moderator'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="h-8 w-8 mr-3 text-red-500" />
            Community Alerts
          </h1>
          <p className="text-gray-600 mt-1">Stay informed about important community updates</p>
        </div>
        {canCreateAlert && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Community Alert</DialogTitle>
                <DialogDescription>
                  Send an important notification to all community members
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Alert Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Brief, clear title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Alert Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Provide clear, actionable information..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Specific Location (Optional)</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Oak Street, Community Center"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isUrgent"
                    checked={formData.isUrgent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isUrgent: checked }))}
                  />
                  <Label htmlFor="isUrgent" className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                    Mark as Urgent Alert
                  </Label>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
                    {isLoading ? 'Creating...' : 'Send Alert'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All
          </Button>
          <Button
            variant={filterType === 'urgent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('urgent')}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Urgent
          </Button>
          <Button
            variant={filterType === 'category' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('category')}
          >
            Security
          </Button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No active alerts at this time'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map(alert => (
            <Card 
              key={alert._id} 
              className={`transition-all hover:shadow-md ${
                alert.isUrgent ? 'border-l-4 border-l-red-500 bg-red-50/30' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {alert.isUrgent && (
                        <Badge variant="destructive" className="animate-pulse">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          URGENT
                        </Badge>
                      )}
                      <Badge className={getCategoryStyle(alert.category)}>
                        {categories.find(c => c.value === alert.category)?.label || alert.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{alert.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {alert.createdBy?.name}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(alert.createdAt)}
                      </div>
                      {alert.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {alert.location}
                        </div>
                      )}
                    </div>
                  </div>
                  {canCreateAlert && (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeactivate(alert._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{alert.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default AlertSystem