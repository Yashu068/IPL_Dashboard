import React, { useContext, useMemo } from 'react'
import { AppContext } from '../context/AppContext'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend)

export default function Analytics(){
  const { matches, theme } = useContext(AppContext)

  // Build live, match-driven aggregates so charts update when scores change
  const inningsList = useMemo(
    () => matches.filter(m => m.status === 'ongoing').flatMap(m => m.innings),
    [matches]
  )
  const runsByTeam = useMemo(() => {
    const map = {}
    inningsList.forEach(inn => { map[inn.team] = (map[inn.team] || 0) + (inn.runs || 0) })
    return map
  }, [inningsList])
  const wicketsByTeam = useMemo(() => {
    const map = {}
    inningsList.forEach(inn => { map[inn.team] = (map[inn.team] || 0) + (inn.wickets || 0) })
    return map
  }, [inningsList])
  const rrByTeam = useMemo(() => {
    const totals = {}
    inningsList.forEach(inn => {
      const key = inn.team
      if(!totals[key]) totals[key] = { runs: 0, overs: 0 }
      totals[key].runs += (inn.runs || 0)
      totals[key].overs += (inn.overs || 0)
    })
    const result = {}
    Object.keys(totals).forEach(team => {
      result[team] = totals[team].overs > 0 ? +(totals[team].runs / totals[team].overs).toFixed(2) : 0
    })
    return result
  }, [inningsList])

  const top5 = useMemo(() => Object.entries(runsByTeam).sort((a,b)=> b[1]-a[1]).slice(0,5), [runsByTeam])
  const teams = useMemo(() => wicketsByTeam, [wicketsByTeam])

  const isDark = theme === 'dark'
  const textColor = isDark ? '#e5e7eb' : '#111827'
  const gridColor = isDark ? '#374151' : '#e5e7eb'
  const palette = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#84cc16']

  const baseCartesianOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } },
      tooltip: { mode: 'index', intersect: false },
    },
    layout: { padding: 8 },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } } },
    layout: { padding: 8 },
  }

  const top5Data = {
    labels: top5.map(([team]) => team),
    datasets: [{
      label: 'Runs (live)',
      data: top5.map(([,runs])=>runs),
      backgroundColor: palette[0],
      borderColor: palette[0],
      borderWidth: 1,
    }]
  }

  const wicketsData = {
    labels: Object.keys(teams),
    datasets: [{
      data: Object.values(teams),
      label: 'Wickets (live)',
      backgroundColor: Object.keys(teams).map((_,i)=> palette[i % palette.length]),
      borderWidth: 0,
    }]
  }

  const rrData = {
    labels: Object.keys(rrByTeam),
    datasets: [
      {
        label: 'Run Rate (live)',
        data: Object.values(rrByTeam),
        fill: false,
        borderColor: palette[2],
        backgroundColor: palette[2],
        pointRadius: 3,
        tension: 0.25,
      }
    ]
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="p-4 border rounded bg-white dark:bg-primary h-64 md:h-80 transition-shadow hover:shadow-lg overflow-hidden">
          <h4 className="font-medium mb-2">Top Teams by Runs (live)</h4>
          <Bar data={top5Data} options={baseCartesianOptions} redraw />
        </div>

        <div className="p-4 border rounded bg-white dark:bg-primary h-64 md:h-80 transition-shadow hover:shadow-lg overflow-hidden">
          <h4 className="font-medium mb-2">Wickets by Team (live)</h4>
          <Pie data={wicketsData} options={pieOptions} redraw />
        </div>

        <div className="p-4 border rounded bg-white dark:bg-primary md:col-span-2 h-64 md:h-96 transition-shadow hover:shadow-lg overflow-hidden">
          <h4 className="font-medium mb-2">Run Rate by Team (live)</h4>
          <Line data={rrData} options={baseCartesianOptions} redraw />
        </div>
      </div>
    </div>
  )
}
