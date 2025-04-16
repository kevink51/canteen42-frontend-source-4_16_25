import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const API_URL = import.meta.env.VITE_BACKEND_API_URL as string || 'https://canteen42-backend-rebuild.onrender.com'

function App() {
 // const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>CANTEEN42</h1>
          <p className="text-sm text-gray-500">API URL: {API_URL}</p>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
