import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Home, ShoppingBag, Calendar, Wrench, Users, Bell, LogOut } from 'lucide-react'
import useAuthStore from '../../store/authStore'

const Header = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">JiraniHub</span>
            </Link>
          </div>

          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/marketplace"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace</span>
              </Link>
              <Link
                to="/events"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link
                to="/services"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <Wrench className="h-4 w-4" />
                <span>Services</span>
              </Link>
              <Link
                to="/directory"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Directory</span>
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hello, {user.name}</span>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
