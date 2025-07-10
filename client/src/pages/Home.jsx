import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ShoppingBag, Calendar, Wrench, Users, MapPin, TrendingUp } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useListingStore from '../store/listingStore'
import useEventStore from '../store/eventStore'
import { formatDate, formatCurrency } from '../lib/utils'

const Home = () => {
  const { user } = useAuthStore()
  const { listings, fetchListings } = useListingStore()
  const { events, fetchEvents } = useEventStore()

  useEffect(() => {
    fetchListings()
    fetchEvents()
  }, [fetchListings, fetchEvents])

  const recentListings = listings.slice(0, 3)
  const upcomingEvents = events.slice(0, 3)

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
              Welcome to <span className="text-primary">JiraniHub</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Your hyperlocal digital community platform. Connect with neighbors, 
              discover local services, join events, and build stronger communities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-primary mx-auto" />
                <CardTitle>Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Buy, sell, and trade with your neighbors safely and conveniently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto" />
                <CardTitle>Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover and join local community events happening near you.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Wrench className="h-12 w-12 text-primary mx-auto" />
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find trusted local service providers for all your needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto" />
                <CardTitle>Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with verified neighbors in your community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {user.location}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button asChild>
              <Link to="/marketplace/new">Post Listing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/events/new">Create Event</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Recent Listings
              </CardTitle>
              <CardDescription>Latest items in your neighborhood</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/marketplace">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentListings.length > 0 ? (
                recentListings.map((listing) => (
                  <div key={listing._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{listing.title}</h4>
                      <p className="text-sm text-gray-600">{listing.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatCurrency(listing.price)}
                      </p>
                      <p className="text-xs text-gray-500">
                        by {listing.postedBy?.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No listings yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Don't miss out on community events</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/events">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event._id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    <div className="flex items-center justify-between mt-2">
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
                <p className="text-gray-500 text-center py-4">No upcoming events</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Active Listings</p>
                <p className="text-2xl font-bold">{listings.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
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

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Your Location</p>
                <p className="text-lg font-semibold">{user.location}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home