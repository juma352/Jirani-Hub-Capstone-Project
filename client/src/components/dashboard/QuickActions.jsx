import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, MessageSquare, Users, Bell, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuickActions = () => {
  const actions = [
    {
      title: "Create Listing",
      description: "Post a new item for sale",
      icon: Plus,
      href: "/dashboard/create-listing",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "New Event",
      description: "Organize community event",
      icon: Calendar,
      href: "/dashboard/events/new",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Send Alert",
      description: "Notify your neighbors",
      icon: Bell,
      href: "/dashboard/alerts",
      color: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      title: "Chat",
      description: "Message community",
      icon: MessageSquare,
      href: "/chat",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Find Members",
      description: "Connect with neighbors",
      icon: Users,
      href: "/dashboard/members",
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Settings",
      description: "Manage your profile",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-gray-500 hover:bg-gray-600"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              asChild
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all"
            >
              <Link to={action.href}>
                <div className={`p-2 rounded-full text-white ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions