import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { 
  ShoppingBag, 
  Calendar, 
  Wrench, 
  Users, 
  MapPin, 
  TrendingUp,
  Star,
  MessageSquare,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  Bell,
  Search,
  Filter,
  Plus
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import useListingStore from '../store/listingStore'
import useEventStore from '../store/eventStore'
import { formatDate, formatCurrency } from '../lib/utils'

const Home = () => {
  const { user } = useAuthStore()
  const { listings, fetchListings } = useListingStore()
  const { events, fetchEvents } = useEventStore()
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeListings: 89,
    upcomingEvents: 12,
    communitiesServed: 25
  })

  useEffect(() => {
    fetchListings()
    fetchEvents()
  }, [fetchListings, fetchEvents])

  const recentListings = listings.slice(0, 3)
  const upcomingEvents = events.slice(0, 3)

  const features = [
    {
      icon: ShoppingBag,
      title: "Local Marketplace",
      description: "Buy and sell with trusted neighbors. From electronics to furniture, find everything you need locally.",
      color: "bg-blue-500",
      stats: "500+ active listings"
    },
    {
      icon: Calendar,
      title: "Community Events",
      description: "Join neighborhood gatherings, workshops, and social events. Build lasting connections.",
      color: "bg-green-500",
      stats: "50+ events monthly"
    },
    {
      icon: Wrench,
      title: "Local Services",
      description: "Find trusted service providers in your area. From plumbing to tutoring, we've got you covered.",
      color: "bg-purple-500",
      stats: "200+ service providers"
    },
    {
      icon: Users,
      title: "Member Directory",
      description: "Connect with verified neighbors and build a stronger community network.",
      color: "bg-orange-500",
      stats: "1000+ verified members"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Westlands, Nairobi",
      avatar: null,
      text: "JiraniHub helped me find a reliable babysitter and sell my old furniture. It's amazing how connected our neighborhood has become!",
      rating: 5
    },
    {
      name: "David Kimani",
      location: "Karen, Nairobi",
      avatar: null,
      text: "The community events feature brought our neighborhood together. We now have monthly clean-up drives and social gatherings.",
      rating: 5
    },
    {
      name: "Grace Wanjiku",
      location: "Kilimani, Nairobi",
      avatar: null,
      text: "Found my go-to plumber and electrician through JiraniHub. The service directory is incredibly helpful!",
      rating: 5
    }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
                🏘️ Building Stronger Communities
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  JiraniHub
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                Your hyperlocal digital community platform. Connect with neighbors, 
                discover local services, join events, and build stronger communities together.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { label: "Active Users", value: stats.totalUsers.toLocaleString() },
                  { label: "Listings", value: stats.activeListings },
                  { label: "Events", value: stats.upcomingEvents },
                  { label: "Communities", value: stats.communitiesServed }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything Your Community Needs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover powerful features designed to bring neighbors together and strengthen local connections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Badge variant="secondary" className="text-xs">
                      {feature.stats}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How JiraniHub Works
              </h2>
              <p className="text-xl text-gray-600">
                Get started in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Sign up and verify your location to join your local community",
                  icon: Users
                },
                {
                  step: "02", 
                  title: "Explore & Connect",
                  description: "Browse listings, events, and services in your neighborhood",
                  icon: Search
                },
                {
                  step: "03",
                  title: "Build Community",
                  description: "Post listings, organize events, and connect with neighbors",
                  icon: Heart
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Community Says
              </h2>
              <p className="text-xl text-gray-600">
                Real stories from real neighbors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Your Community?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start connecting with your neighbors today. It's free and takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg" asChild>
                <Link to="/register">
                  Join JiraniHub Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg" asChild>
                <Link to="/login">Already a Member?</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated User Dashboard Preview
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-blue-100 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </p>
              <div className="mt-4">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button className="bg-white/20 hover:bg-white/30 border-white/30" asChild>
                <Link to="/dashboard/create-listing">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Listing
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/dashboard/events/new">Create Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Listings</p>
                  <p className="text-2xl font-bold">{listings.length}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Upcoming Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Community Score</p>
                  <p className="text-2xl font-bold">850</p>
                </div>
                <Star className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Messages</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <MessageSquare className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Listings */}
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Listings
                </CardTitle>
                <CardDescription>Latest items in your neighborhood</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/listings">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentListings.length > 0 ? (
                  recentListings.map((listing) => (
                    <div key={listing._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <h4 className="font-medium">{listing.title}</h4>
                        <p className="text-sm text-gray-600 capitalize">{listing.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {formatCurrency(listing.price)}
                        </p>
                        <p className="text-xs text-gray-500">
                          by {listing.postedBy?.name}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No listings yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Don't miss out on community events</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/events">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event._id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">
                          {event.dateTime && formatDate(event.dateTime)}
                        </p>
                        <p className="text-xs text-gray-500">
                          by {event.createdBy?.name}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No upcoming events</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get things done faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Plus, label: "Create Listing", href: "/dashboard/create-listing", color: "bg-blue-500" },
                { icon: Calendar, label: "New Event", href: "/dashboard/events/new", color: "bg-green-500" },
                { icon: Bell, label: "Send Alert", href: "/dashboard/alerts", color: "bg-red-500" },
                { icon: MessageSquare, label: "Chat", href: "/chat", color: "bg-purple-500" }
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all"
                  asChild
                >
                  <Link to={action.href}>
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home