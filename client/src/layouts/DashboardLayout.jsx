import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/providers/useAuthStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ErrorBoundary from './ErrorBoundary';
// Removed unused import of header which caused build error

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md font-medium ${
        isActive ? 'bg-primary text-white' : 'hover:bg-muted'
      }`}
    >
      {label}
    </Link>
  );
};

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate= useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="flex min-h-screen bg-muted text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm px-5 py-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-primary">JiraniHub</h2>
        <nav className="flex flex-col gap-2">
          <SidebarLink to="/dashboard" label="Dashboard" />
          <SidebarLink to="/dashboard/listings" label="Listings" />
          <SidebarLink to="/dashboard/services" label="Services" />
          <SidebarLink to="/dashboard/events" label="Events" />
          <SidebarLink to="/dashboard/members" label="Members" />
          <SidebarLink to="/dashboard/alerts" label="Alerts" />
          <SidebarLink to="/dashboard/announcements" label="Announcements" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
          <div className="text-lg font-semibold">Welcome Back 👋</div>
          <div className="flex items-center gap-4">
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
            <Button size="sm" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        {/* Dynamic Page */}
        <main className="flex-1 p-6">
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
