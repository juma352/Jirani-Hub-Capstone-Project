<<<<<<< HEAD
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* You can add header, sidebar, footer here if needed */}
      <main>{children}</main>
=======
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
    </div>
  )
}

<<<<<<< HEAD
export default Layout
=======
export default Layout
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
