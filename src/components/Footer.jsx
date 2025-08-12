import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-primary">
      <div className="max-w-7xl mx-auto p-4 text-sm text-muted flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="font-medium text-primary dark:text-white">Credits:</span>{' '}
          UI built with React + Vite + Tailwind • Icons: react-icons • Charts: Chart.js + react-chartjs-2
        </div>
        <div>
          <span className="font-medium text-primary dark:text-white">Data source:</span>{' '}
          Static JSON mock data in src/data (demo only; not official IPL data)
        </div>
      </div>
    </footer>
  )
}


