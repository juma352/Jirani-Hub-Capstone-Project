import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAnnouncementStore from '../store/announcementStore'
import useAuthStore from '../providers/useAuthStore'

const Newsfeed = () => {
  const { user } = useAuthStore()
  const { announcements, fetchAnnouncements, createAnnouncement, deactivateAnnouncement, isLoading, error } = useAnnouncementStore()
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  })
  const [showForm, setShowForm] = useState(false)

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
      setShowForm(false)
      setFormData({ title: '', message: '' })
    }
  }

  const handleDeactivate = async (id) => {
    await deactivateAnnouncement(id)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Community Newsfeed</h1>
        {(user?.role === 'admin' || user?.role === 'moderator') && (
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create Announcement'}
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Announcement'}
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map(announcement => (
            <Card key={announcement._id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{announcement.title}</CardTitle>
                {(user?.role === 'admin' || user?.role === 'moderator') && (
                  <Button variant="outline" size="sm" onClick={() => handleDeactivate(announcement._id)}>
                    Deactivate
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <p>{announcement.message}</p>
                <p className="text-xs text-gray-500 mt-2">By: {announcement.createdBy?.name}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Newsfeed
