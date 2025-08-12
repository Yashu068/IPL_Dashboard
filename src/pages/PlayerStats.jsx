import React, { useContext, useMemo, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

export default function PlayerStats(){
  const { players, searchQuery } = useContext(AppContext)
  const [query, setQuery] = useState(searchQuery)
  useEffect(()=>{ setQuery(searchQuery) }, [searchQuery])
  const [role, setRole] = useState('')
  const [sortBy, setSortBy] = useState('runs')
  const [dir, setDir] = useState('desc')

  const filtered = useMemo(()=>{
    return players.filter(p => (
      (p.name.toLowerCase().includes(query.toLowerCase()) || p.team.toLowerCase().includes(query.toLowerCase()))
      && (role ? p.role === role : true)
    )).sort((a,b)=>{
      if(sortBy === 'runs') return dir === 'desc' ? b.runs - a.runs : a.runs - b.runs
      return dir === 'desc' ? b.wickets - a.wickets : a.wickets - b.wickets
    })
  },[players, query, role, sortBy, dir])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold">Player Stats</h2>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder="Search name or team"
            className="p-2 border rounded bg-white dark:bg-primary border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 w-full sm:w-64"
          />
          <select
            value={role}
            onChange={e=>setRole(e.target.value)}
            className="p-2 border rounded bg-white dark:bg-primary border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white w-[150px]"
          >
            <option value="">All Roles</option>
            <option value="batsman">Batsman</option>
            <option value="bowler">Bowler</option>
            <option value="ar">All-rounder</option>
            <option value="wk">Wicketkeeper</option>
          </select>
          <select
            value={sortBy}
            onChange={e=>setSortBy(e.target.value)}
            className="p-2 border rounded bg-white dark:bg-primary border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white w-[150px]"
          >
            <option value="runs">Sort: Runs</option>
            <option value="wickets">Sort: Wickets</option>
          </select>
          <button
            onClick={()=>setDir(d=> d === 'desc' ? 'asc' : 'desc')}
            className="p-2 border rounded transition-colors border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white w-full sm:w-auto"
          >
            {dir}
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded border">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Team</th>
              <th className="p-2 hidden xs:table-cell">Matches</th>
              <th className="p-2">Runs</th>
              <th className="p-2">Wickets</th>
              <th className="p-2 hidden sm:table-cell">Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.team}</td>
                <td className="p-2 hidden xs:table-cell">{p.matches}</td>
                <td className="p-2">{p.runs}</td>
                <td className="p-2">{p.wickets}</td>
                <td className="p-2 hidden sm:table-cell">{p.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
