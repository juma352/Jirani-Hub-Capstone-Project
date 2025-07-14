import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Calendar, Wrench, Users } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-md p-8 bg-white rounded shadow mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary">JiraniHub</span>
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Your hyperlocal digital community platform. Connect with neighbors, discover local services, join events, and build stronger communities.
        </p>
        <div className="flex justify-center gap-6">
          <Button size="lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
  )
}

export default Home

