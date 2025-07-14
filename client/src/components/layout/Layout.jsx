import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* You can add header, sidebar, footer here if needed */}
      <main>{children}</main>
    </div>
  )
}

export default Layout
