import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useAnnouncementStore from '../store/announcementStore'
import useAuthStore from '../providers/useAuthStore'
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter,
  Clock,
  User,
  Eye,
  EyeOff,
  Pin,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  TrendingUp
} from 'lucide-react'
import { formatDate } from '../lib/utils'

const Newsfeed = () => {
  const { user } = useAuthStore()
  const { announcements, fetchAnnouncements, createAnnouncement, deactivateAnnouncement, isLoading, error } = useAnnouncementStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'general',
    isPinned: false
  })

  const categories = [
    { value: 'general', label: 'General', icon: Megaphone, color: 'bg-blue-100 text-blue-800' },
    { value: 'events', label: 'Events', icon: Calendar, color: 'bg-green-100 text-green-800' },
    { value: 'maintenance', label: 'Maintenance', icon: Settings, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'community', label: 'Community', icon: Users, color: 'bg-purple-100 text-purple-800' },
    { value: 'business', label: 'Business', icon: Briefcase, color: 'bg-indigo-100 text-indigo-800' }
  ]

  useEffect(() => {
    fetchAnnouncements()
  }, [fetchAnnouncements])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await createAnnouncement(formData)
    if (result.success) {
      setShowCreateDialog(false)
      setFormData({ title: '', message: '', category: 'general', isPinned: false })
    }
  }

  const handleDeactivate = async (id) => {
    if (window.confirm('Are you sure you want to remove this announcement?')) {
      await deactivateAnnouncement(id)
    }
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || announcement.category === filterType
    return matchesSearch && matchesFilter
  })

  const getCategoryStyle = (category) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.color : 'bg-gray-100 text-gray-800'
  }

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.icon : Megaphone
  }

  const canCreateAnnouncement = user?.role === 'admin' || user?.role === 'moderator'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Megaphone className="h-8 w-8 mr-3 text-blue-500" />
            Community Newsfeed
          </h1>
          <p className="text-gray-600 mt-1">Stay updated with the latest community news and announcements</p>
        </div>
        {canCreateAnnouncement && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>
                  Share important news and updates with the community
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Announcement Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="What's the news?"
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
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Share the details..."
                    rows={5}
                  />
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
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? 'Publishing...' : 'Publish Announcement'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Posts</p>
                <p className="text-2xl font-bold">{announcements.length}</p>
              </div>
              <Megaphone className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Engagement</p>
                <p className="text-2xl font-bold">89%</p>
              </div>
              <Heart className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Users</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <User className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.value}
              variant={filterType === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No announcements available at this time'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAnnouncements.map(announcement => {
            const CategoryIcon = getCategoryIcon(announcement.category)
            return (
              <Card key={announcement._id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={announcement.createdBy?.avatar} />
                        <AvatarFallback>
                          {announcement.createdBy?.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getCategoryStyle(announcement.category)}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {categories.find(c => c.value === announcement.category)?.label || announcement.category}
                          </Badge>
                          {announcement.isPinned && (
                            <Badge variant="secondary">
                              <Pin className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {announcement.createdBy?.name}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(announcement.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {canCreateAnnouncement && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeactivate(announcement._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">{announcement.message}</p>
                  
                  {/* Engagement Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
                        <Heart className="h-4 w-4 mr-1" />
                        24
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        8
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-500">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-yellow-500">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Newsfeed