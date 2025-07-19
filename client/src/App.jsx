import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import CreateListing from './pages/CreateListing'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import Services from './pages/Services'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import useAuthStore from './providers/useAuthStore'
import ListingDetail from './pages/ListingDetail'
import EditListing from './pages/EditListing'
import MemberDirectory from './pages/MemberDirectory'
import AlertSystem from './pages/AlertSystem'
import Newsfeed from './pages/Newsfeed'
import Settings from './pages/Settings'
import ErrorBoundary from './layouts/ErrorBoundary'
import Checkout from './pages/Checkout'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore()
  return user ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore()
  return !user ? children : <Navigate to="/dashboard" />
}

function App() {
  const { checkAuth, loading, user } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading JiraniHub...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Home Route - Always accessible */}
          <Route path="/home" element={
            <Layout>
              <Home />
            </Layout>
          } />
          
          {/* Root Route - Smart redirect based on auth status */}
          <Route path="/" element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />
          } />
          
          {/* Auth Routes - Only for non-authenticated users */}
          <Route path="/login" element={
            !user ? <Login /> : <Navigate to="/dashboard" replace />
          } />
          <Route path="/register" element={
            !user ? <Register /> : <Navigate to="/dashboard" replace />
          } />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            user ? <DashboardLayout /> : <Navigate to="/login" replace />
          }>
            <Route index element={<Dashboard />} />
            <Route path="listings" element={<Marketplace />} />
            <Route path="services" element={<Services />} />
            <Route path="events" element={<Events />} />
            <Route path="create-listing" element={<CreateListing />} />
            {['admin', 'moderator'].includes(user?.role) && (
              <Route path="events/new" element={<CreateEvent />} />
            )}
            <Route path="members" element={<MemberDirectory />} />
            <Route path="alerts" element={<AlertSystem />} />
            <Route path="announcements" element={<Newsfeed />} />
            <Route path="settings" element={<Settings />} />
            <Route path="edit-listing/:id" element={<EditListing />} />
          </Route>
          
          {/* Legacy Routes - Redirect to dashboard equivalents */}
          <Route path="/marketplace" element={
            user ? <Navigate to="/dashboard/listings" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/events/new" element={
            user ? <Navigate to="/dashboard/events/new" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/marketplace/:id" element={
            user ? <ListingDetail /> : <Navigate to="/login" replace />
          } />
          
          {/* Chat Routes */}
          <Route path="/chat" element={
            user ? <Chat /> : <Navigate to="/login" replace />
          } />
          <Route path="/chat/:userId" element={
            user ? <Chat /> : <Navigate to="/login" replace />
          } />
          
          {/* Checkout Route */}
          <Route path="/checkout/:orderId" element={
            user ? <Checkout /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App

