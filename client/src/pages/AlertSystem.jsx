import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAlertStore from '../store/alertStore'
import useAuthStore from '../providers/useAuthStore'

const AlertSystem = () => {
  const { user } = useAuthStore()
  const { alerts, fetchAlerts, createAlert, deactivateAlert, isLoading, error } = useAlertStore()
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    isUrgent: false
  })
  const [showForm, setShowForm] = useState(false)

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
    const result = await createAlert(formData)
    if (result.success) {
      setShowForm(false)
      setFormData({ title: '', message: '', isUrgent: false })
    }
  }

  const handleDeactivate = async (id) => {
    await deactivateAlert(id)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Community Alerts</h1>
        {(user?.role === 'admin' || user?.role === 'moderator') && (
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create Alert'}
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
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isUrgent"
              checked={formData.isUrgent}
              onChange={handleChange}
              id="isUrgent"
            />
            <label htmlFor="isUrgent" className="font-medium">Mark as Urgent</label>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Alert'}
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      )}

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <p>No active alerts.</p>
        ) : (
          alerts.map(alert => (
            <Card key={alert._id} className={alert.isUrgent ? 'border-red-500 border-2' : ''}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{alert.title}</CardTitle>
                {(user?.role === 'admin' || user?.role === 'moderator') && (
                  <Button variant="outline" size="sm" onClick={() => handleDeactivate(alert._id)}>
                    Deactivate
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <p>{alert.message}</p>
                <p className="text-xs text-gray-500 mt-2">By: {alert.createdBy?.name}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default AlertSystem
