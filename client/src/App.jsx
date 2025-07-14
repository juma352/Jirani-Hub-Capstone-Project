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
<<<<<<< HEAD
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import useAuthStore from './providers/useAuthStore'
import ListingDetail from './pages/ListingDetail'
import EditListing from './pages/EditListing'
import MemberDirectory from './pages/MemberDirectory'
import AlertSystem from './pages/AlertSystem'
import Newsfeed from './pages/Newsfeed'
import ErrorBoundary from './layouts/ErrorBoundary'
=======
import useAuthStore from './store/authStore'
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore()
  return user ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore()
<<<<<<< HEAD
  return !user ? children : <Navigate to="/dashboard" />
}

function App() {
  const { checkAuth, loading, user } = useAuthStore()
=======
  return !user ? children : <Navigate to="/" />
}

function App() {
  const { checkAuth } = useAuthStore()
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

<<<<<<< HEAD
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
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="members" element={<MemberDirectory />} />
            <Route path="alerts" element={<AlertSystem />} />
            <Route path="announcements" element={<Newsfeed />} />
            <Route path="edit-listing/:id" element={<EditListing />} />
          </Route>
          <Route path="/events/new" element={
            user ? <CreateEvent /> : <Navigate to="/login" />
          } />
          <Route path="/marketplace/:id" element={
            user ? <ListingDetail /> : <Navigate to="/login" />
          } />
          <Route path="/chat" element={
            user ? <Chat /> : <Navigate to="/login" />
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App

=======
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        
        <Route path="/marketplace" element={
          <ProtectedRoute>
            <Layout>
              <Marketplace />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/marketplace/new" element={
          <ProtectedRoute>
            <Layout>
              <CreateListing />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/events" element={
          <ProtectedRoute>
            <Layout>
              <Events />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/events/new" element={
          <ProtectedRoute>
            <Layout>
              <CreateEvent />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/services" element={
          <ProtectedRoute>
            <Layout>
              <Services />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
