import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import useListingStore from '../store/listingStore';
import useEventStore from '../store/eventStore';
import useServiceStore from '../store/serviceStore';
import useAuthStore from '../providers/useAuthStore';
import { 
  ShoppingBag, 
  Calendar, 
  Wrench, 
  Users, 
  TrendingUp, 
  MapPin,
  Star,
  MessageSquare,
  Bell,
  Target,
  Award
} from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { listings, fetchListings } = useListingStore();
  const { events, fetchEvents } = useEventStore();
  const { services, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchListings();
    fetchEvents();
    fetchServices();
  }, [fetchListings, fetchEvents, fetchServices]);

  // Calculate user stats
  const userListings = listings.filter(listing => listing.postedBy?._id === user?._id);
  const userEvents = events.filter(event => event.createdBy?._id === user?._id);
  const totalViews = userListings.reduce((sum, listing) => sum + (listing.views || 0), 0);
  const completionRate = 85; // Mock completion rate

  const recentListings = listings.slice(0, 4);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              {user?.location}
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="h-3 w-3 mr-1" />
                Community Member
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Award className="h-3 w-3 mr-1" />
                Active Contributor
              </Badge>
            </div>
          </div>
          <WeatherWidget location={user?.location} />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Your Listings"
          value={userListings.length}
          icon={ShoppingBag}
          trend="up"
          trendValue="+12%"
          description="Active marketplace posts"
          color="primary"
        />
        <StatsCard
          title="Events Created"
          value={userEvents.length}
          icon={Calendar}
          trend="up"
          trendValue="+8%"
          description="Community events organized"
          color="success"
        />
        <StatsCard
          title="Total Views"
          value={totalViews}
          icon={TrendingUp}
          trend="up"
          trendValue="+25%"
          description="Views on your content"
          color="warning"
        />
        <StatsCard
          title="Profile Score"
          value={`${completionRate}%`}
          icon={Target}
          description="Profile completion"
          color="purple"
        />
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <QuickActions />
              
              {/* Recent Listings */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Marketplace Activity</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard/listings">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentListings.map((listing) => (
                      <div key={listing._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{listing.title}</h4>
                            <p className="text-sm text-gray-600 capitalize">{listing.category}</p>
                          </div>
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ActivityFeed />
              
              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>✅ Basic Info</span>
                        <Badge variant="success">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>✅ Location</span>
                        <Badge variant="success">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>⏳ Profile Photo</span>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>⏳ Bio</span>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Listings</h2>
            <Button asChild>
              <Link to="/dashboard/create-listing">Create New Listing</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => (
              <Card key={listing._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <p className="text-sm text-gray-600 capitalize">{listing.category}</p>
                    </div>
                    <Badge variant={listing.isActive ? "success" : "secondary"}>
                      {listing.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(listing.price)}
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Views: {listing.views || 0}</span>
                      <span>{formatDate(listing.createdAt)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/marketplace/${listing._id}`}>View</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/dashboard/edit-listing/${listing._id}`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Events</h2>
            <Button asChild>
              <Link to="/dashboard/events/new">Create New Event</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userEvents.map((event) => (
              <Card key={event._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-gray-600">{event.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.dateTime && formatDate(event.dateTime)}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees?.length || 0} attending
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Manage Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Views</span>
                    <span className="font-semibold">{totalViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average per Listing</span>
                    <span className="font-semibold">
                      {userListings.length > 0 ? Math.round(totalViews / userListings.length) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Events Attended</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Messages Sent</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connections Made</span>
                    <span className="font-semibold">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>New Listings</span>
                    <Badge variant="success">+3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Events Created</span>
                    <Badge variant="info">+1</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Profile Views</span>
                    <Badge variant="warning">+15</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;