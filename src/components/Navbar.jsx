import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FiSun, FiMoon, FiSearch, FiMenu } from 'react-icons/fi'

export default function Navbar(){
  const { theme, toggleTheme, searchQuery, setSearchQuery, isSidebarOpen, setIsSidebarOpen } = useContext(AppContext)
  const [q, setQ] = useState(searchQuery)
  const navigate = useNavigate()

  useEffect(()=>{
    const handler = e => {
      if(e.ctrlKey && e.key === '1') navigate('/')
      if(e.ctrlKey && e.key === '2') navigate('/players')
      if(e.ctrlKey && e.key === '3') navigate('/fantasy')
      if(e.ctrlKey && e.key === '4') navigate('/analytics')
    }
    window.addEventListener('keydown', handler)
    return ()=> window.removeEventListener('keydown', handler)
  },[navigate])

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-primary/95 backdrop-blur p-3 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold btn-sporty">IPL</div>
          <div className="font-semibold">IPL Live & Fantasy</div>
        </div>

        <button
          className="md:hidden p-2 rounded border border-gray-200 dark:border-gray-700"
          onClick={()=>setIsSidebarOpen(v=>!v)}
          aria-label="Toggle filters"
        >
          <FiMenu />
        </button>

        <div className="flex-1 order-3 md:order-none w-full md:w-auto">
          <div className="relative max-w-full md:max-w-lg">
            <FiSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              value={q}
              onChange={e=>{
                const val = e.target.value
                setQ(val)
                setSearchQuery(val)
              }}
              placeholder="Search players or matches..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary text-sm focus:ring-2 focus:ring-sporty/30 focus:border-sporty"
            />
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <NavLink to="/" className={({isActive})=> isActive? 'text-sporty font-semibold':'text-muted hover:text-sporty'}>Live</NavLink>
          <NavLink to="/players" className={({isActive})=> isActive? 'text-sporty font-semibold':'text-muted hover:text-sporty'}>Players</NavLink>
          <NavLink to="/fantasy" className={({isActive})=> isActive? 'text-sporty font-semibold':'text-muted hover:text-sporty'}>Fantasy</NavLink>
          <NavLink to="/analytics" className={({isActive})=> isActive? 'text-sporty font-semibold':'text-muted hover:text-sporty'}>Analytics</NavLink>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
            {theme === 'light' ? <FiMoon/> : <FiSun/>}
          </button>
        </div>

        {/* Mobile links row */}
        <div className="w-full md:hidden order-4">
          <div className="flex items-center justify-between pt-2">
            <NavLink to="/" className={({isActive})=> isActive? 'text-sporty font-semibold text-sm':'text-muted text-sm'}>Live</NavLink>
            <NavLink to="/players" className={({isActive})=> isActive? 'text-sporty font-semibold text-sm':'text-muted text-sm'}>Players</NavLink>
            <NavLink to="/fantasy" className={({isActive})=> isActive? 'text-sporty font-semibold text-sm':'text-muted text-sm'}>Fantasy</NavLink>
            <NavLink to="/analytics" className={({isActive})=> isActive? 'text-sporty font-semibold text-sm':'text-muted text-sm'}>Analytics</NavLink>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-md border border-gray-200 dark:border-gray-700">
              {theme === 'light' ? <FiMoon/> : <FiSun/>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
