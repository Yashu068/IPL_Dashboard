import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import LiveMatches from './pages/LiveMatches'
import PlayerStats from './pages/PlayerStats'
import FantasyBuilder from './pages/FantasyBuilder'
import Analytics from './pages/Analytics'

export default function App(){
  return (
    <div className="min-h-screen bg-white dark:bg-primary transition-colors duration-200 text-primary dark:text-white">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<LiveMatches/>} />
            <Route path="/players" element={<PlayerStats/>} />
            <Route path="/fantasy" element={<FantasyBuilder/>} />
            <Route path="/analytics" element={<Analytics/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
