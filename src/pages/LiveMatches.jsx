import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import MatchCard from '../components/MatchCard'
import { simulateMatchTick } from '../utils/simulateLive'

export default function LiveMatches(){
  const { matches, setMatches, selectedTeam, selectedVenue, searchQuery } = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  const passesFilters = (m)=> {
    const okTeam = selectedTeam ? (m.teamA === selectedTeam || m.teamB === selectedTeam) : true
    const okVenue = selectedVenue ? m.venue === selectedVenue : true
    const q = (searchQuery || '').toLowerCase().trim()
    const okSearch = q ? (
      m.teamA.toLowerCase().includes(q) ||
      m.teamB.toLowerCase().includes(q) ||
      m.venue.toLowerCase().includes(q) ||
      m.status.toLowerCase().includes(q)
    ) : true
    return okTeam && okVenue && okSearch
  }
  const liveMatches = matches.filter(m => m.status === 'ongoing' && passesFilters(m))
  const completedMatches = matches.filter(m => m.status === 'completed' && passesFilters(m))

  const manualRefresh = ()=>{
    setLoading(true)
    // Advance each match by one simulated tick
    setMatches(prev => prev.map(m => simulateMatchTick(m)))
    setTimeout(()=>{ setLoading(false) }, 300)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Live Matches</h2>
        <div className="flex items-center gap-2">
          <button onClick={manualRefresh} disabled={loading} className={`px-3 py-2 rounded text-white transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'btn-sporty'}`}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
      </div>

      {completedMatches.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary dark:text-white">Completed Matches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {completedMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      )}
    </div>
  )
}

