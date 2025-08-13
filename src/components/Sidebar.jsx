import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { venueToCity } from '../utils/venueToCity'
import { generateDummyWeather } from '../utils/weather'

export default function Sidebar(){
  const { matches, selectedTeam, setSelectedTeam, selectedVenue, setSelectedVenue, isSidebarOpen, setIsSidebarOpen, weatherByVenue } = useContext(AppContext)
  const [open, setOpen] = useState(true)
  const teams = Array.from(new Set(matches.flatMap(m => [m.teamA, m.teamB])))
  const venues = Array.from(new Set(matches.map(m => m.venue)))

  useEffect(()=>{
    // Sync internal open with global mobile toggle on small screens
    setOpen(isSidebarOpen || window.innerWidth >= 768)
  },[isSidebarOpen])

  return (
    <aside className={`w-full md:w-64 p-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 transition-all ${open? 'block':'hidden'} md:block bg-white dark:bg-primary md:bg-transparent`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-primary dark:text-white">Filters</h4>
        <button className="text-sm md:hidden" onClick={()=>setIsSidebarOpen(v=>!v)}>{open? 'Hide':'Show'}</button>
      </div>

      <div>
        <label className="block text-xs text-muted mb-1">By Team</label>
        <select value={selectedTeam} onChange={e=>setSelectedTeam(e.target.value)} className="w-full p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary">
          <option value="">All Teams</option>
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-xs text-muted mb-1">By Venue</label>
        <select value={selectedVenue} onChange={e=>setSelectedVenue(e.target.value)} className="w-full p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary">
          <option value="">All Venues</option>
          {venues.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="mt-6 text-xs text-muted">Tip: Use <kbd>Ctrl+1</kbd>.. <kbd>Ctrl+4</kbd> to switch pages.</div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2 text-primary dark:text-white">Weather</h4>
        {selectedVenue ? (
          <div className="p-3 border rounded">
            <div className="text-sm font-medium">{selectedVenue}</div>
            {(() => {
              const data = weatherByVenue[selectedVenue] || generateDummyWeather(venueToCity(selectedVenue))
              return (
                <div className="text-xs text-muted mt-1">
                  {venueToCity(selectedVenue)} • {data.tempC}°C • {data.condition}
                </div>
              )
            })()}
          </div>
        ) : (
          <div className="space-y-2">
            {venues.slice(0,3).map(v => (
              <div key={v} className="p-3 border rounded">
                <div className="text-sm font-medium">{v}</div>
                {(() => {
                  const data = weatherByVenue[v] || generateDummyWeather(venueToCity(v))
                  return (
                    <div className="text-xs text-muted mt-1">
                      {venueToCity(v)} • {data.tempC}°C • {data.condition}
                    </div>
                  )
                })()}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
