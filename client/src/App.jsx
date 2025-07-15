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
    return <div>Loading...</div>
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/home" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={
            !user ? <Login /> : <Navigate to="/dashboard" />
          } />
          <Route path="/register" element={
            !user ? <Register /> : <Navigate to="/dashboard" />
          } />
          <Route path="/dashboard" element={
            user ? <DashboardLayout /> : <Navigate to="/login" />
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
            {['admin', 'moderator'].includes(user?.role) && null}
            <Route path="alerts" element={<AlertSystem />} />
                <Route path="announcements" element={<Newsfeed />} />
            <Route path="settings" element={<Settings />} />
            <Route path="edit-listing/:id" element={<EditListing />} />
          </Route>
          <Route path="/marketplace" element={
            user ? <Marketplace /> : <Navigate to="/login" />
          } />
          <Route path="/events/new" element={
            user ? <CreateEvent /> : <Navigate to="/login" />
          } />
          <Route path="/marketplace/:id" element={
            user ? <ListingDetail /> : <Navigate to="/login" />
          } />
          <Route path="/chat" element={
            user ? <Chat /> : <Navigate to="/login" />
          } />
          <Route path="/chat/:userId" element={
            user ? <Chat /> : <Navigate to="/login" />
          } />
          <Route path="/checkout/:orderId" element={
            user ? <Checkout /> : <Navigate to="/login" />
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App

