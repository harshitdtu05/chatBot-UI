import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleAuth = (userData) => {
    setUser(userData)
    console.log('Authenticated:', userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Auth onAuth={handleAuth} />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" /> : <Auth onAuth={handleAuth} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <DashboardLayout onLogout={handleLogout}>
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
