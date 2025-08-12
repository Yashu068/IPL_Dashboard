import React, { createContext, useEffect, useState } from 'react'
import matchesData from '../data/matches.json'
import playersSample from '../data/players.json'
import { simulateMatchTick } from '../utils/simulateLive'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [matches, setMatches] = useState(() => JSON.parse(JSON.stringify(matchesData)))
  const [players, setPlayers] = useState(() => playersSample)
  const [fantasyTeam, setFantasyTeam] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fantasyTeam')) || [] } catch { return [] }
  })
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedVenue, setSelectedVenue] = useState('')
  const [activeMatchId, setActiveMatchId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  },[theme])

  // simulated live update every 30s
  useEffect(()=>{
    const id = setInterval(()=>{
      setMatches(prev => prev.map(m => simulateMatchTick(m)))
    }, 30000)
    return ()=>clearInterval(id)
  },[])

  useEffect(()=>{
    localStorage.setItem('fantasyTeam', JSON.stringify(fantasyTeam))
  },[fantasyTeam])

  const toggleTheme = ()=> setTheme(t => t === 'light' ? 'dark' : 'light')

  const addPlayerToFantasy = (player)=>{
    if(fantasyTeam.find(p => p.id === player.id)) return { ok:false, msg:'Player already selected' }
    const counts = { batsman:0, bowler:0, wk:0, ar:0 }
    fantasyTeam.forEach(p => counts[p.role] = (counts[p.role]||0) + 1)
    if(player.role === 'batsman' && counts.batsman >= 5) return { ok:false, msg:'Max 5 batsmen' }
    if(player.role === 'bowler' && counts.bowler >= 4) return { ok:false, msg:'Max 4 bowlers' }
    if(player.role === 'wk' && counts.wk >= 1) return { ok:false, msg:'Max 1 wicketkeeper' }
    if(player.role === 'ar' && counts.ar >= 1) return { ok:false, msg:'Max 1 all-rounder' }
    if(fantasyTeam.length >= 11) return { ok:false, msg:'Team full (11 players)' }

    setFantasyTeam(prev => [...prev, player])
    return { ok:true }
  }

  const removePlayerFromFantasy = (playerId)=>{
    setFantasyTeam(prev => prev.filter(p => p.id !== playerId))
  }

  const clearFantasy = ()=> setFantasyTeam([])

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      matches, setMatches,
      players, setPlayers,
      fantasyTeam, addPlayerToFantasy, removePlayerFromFantasy, clearFantasy,
      selectedTeam, setSelectedTeam,
      selectedVenue, setSelectedVenue,
      activeMatchId, setActiveMatchId,
      searchQuery, setSearchQuery,
      isSidebarOpen, setIsSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  )
}
