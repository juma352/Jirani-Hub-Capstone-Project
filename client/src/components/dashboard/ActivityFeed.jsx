import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ShoppingBag, Calendar, Users, MessageSquare, Bell } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'listing': return ShoppingBag
      case 'event': return Calendar
      case 'member': return Users
      case 'message': return MessageSquare
      case 'alert': return Bell
      default: return Bell
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'listing': return 'bg-blue-100 text-blue-600'
      case 'event': return 'bg-green-100 text-green-600'
      case 'member': return 'bg-purple-100 text-purple-600'
      case 'message': return 'bg-yellow-100 text-yellow-600'
      case 'alert': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  // Mock activities if none provided
  const mockActivities = [
    {
      id: 1,
      type: 'listing',
      title: 'New listing posted',
      description: 'iPhone 13 Pro Max posted by John Doe',
      user: { name: 'John Doe', avatar: null },
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: 2,
      type: 'event',
      title: 'Community meeting scheduled',
      description: 'Monthly neighborhood meeting this Saturday',
      user: { name: 'Jane Smith', avatar: null },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: 3,
      type: 'member',
      title: 'New member joined',
      description: 'Welcome Mike Johnson to the community',
      user: { name: 'Mike Johnson', avatar: null },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
    },
    {
      id: 4,
      type: 'alert',
      title: 'Security alert',
      description: 'Suspicious activity reported on Oak Street',
      user: { name: 'Security Team', avatar: null },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
    }
  ]

  const displayActivities = activities.length > 0 ? activities : mockActivities

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(activity.timestamp)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500 ml-2">
                      {activity.user.name}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityFeed