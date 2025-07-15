import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/providers/useAuthStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ErrorBoundary from './ErrorBoundary';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  Wrench, 
  Users, 
  Bell, 
  MessageSquare,
  Settings,
  LogOut,
  Home
} from 'lucide-react';

const SidebarLink = ({ to, label, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-3 py-2 rounded font-medium transition-all ${
        isActive 
          ? 'bg-primary text-black shadow-sm' 
          : 'text-gray-700 hover:bg-gray-200 hover:text-primary'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate= useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden  md:block">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">JiraniHub</h2>
          </div>
          
          <nav className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main
            </div>
            <SidebarLink to="/dashboard" label="Dashboard" icon={LayoutDashboard} />
            <SidebarLink to="/dashboard/listings" label="Marketplace" icon={ShoppingBag} />
            <SidebarLink to="/dashboard/events" label="Events" icon={Calendar} />
            <SidebarLink to="/dashboard/services" label="Services" icon={Wrench} />
            
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">
              Community
            </div>
            <SidebarLink to="/dashboard/members" label="Members" icon={Users} />
            <>
              <SidebarLink to="/dashboard/alerts" label="Alerts" icon={Bell} />
              <SidebarLink to="/dashboard/announcements" label="News" icon={MessageSquare} />
            </>
            
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">
              Account
            </div>
            <SidebarLink to="/dashboard/settings" label="Settings" icon={Settings} />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">
              {location.pathname === '/dashboard' ? 'Dashboard' : 
               location.pathname.split('/').pop().charAt(0).toUpperCase() + 
               location.pathname.split('/').pop().slice(1)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <div className="text-right">
              <div className="font-medium">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
            <Avatar>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Dynamic Page */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const DashboardLayoutWithErrorBoundary = () => (
  <ErrorBoundary>
    <DashboardLayout />
  </ErrorBoundary>
);

export default DashboardLayoutWithErrorBoundary;
