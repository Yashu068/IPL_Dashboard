import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

function Inning({inn}){
  return (
    <div className="p-2 border rounded">
      <div className="font-medium">{inn.team}</div>
      <div className="text-sm">{inn.runs}/{inn.wickets} ({inn.overs} ov)</div>
      <div className="text-xs text-muted">RR: {inn.rr}</div>
    </div>
  )
}

export default function MatchCard({ match }){
  const { activeMatchId, setActiveMatchId } = useContext(AppContext)
  const open = activeMatchId === match.id
  useEffect(()=>{
    if(!open) return
    const onKey = (e)=>{ if(e.key === 'Escape') setActiveMatchId(null) }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[open, setActiveMatchId])
  return (
    <motion.div
      className="relative p-4 border rounded shadow-sm bg-white dark:bg-primary transition-shadow transform-gpu will-change-transform hover:shadow-lg hover:z-10"
      whileHover={open ? {} : { scale: 1.01 }}
      transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-semibold">{match.teamA} vs {match.teamB}</div>
          <div className="text-xs text-muted">{match.venue} • {match.status}</div>
        </div>
        <div>
          <button type="button" onClick={()=>setActiveMatchId(match.id)} className="px-3 py-1 rounded border transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">Details</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {match.innings.map((inn,i) => <Inning key={i} inn={inn} />)}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={()=>setActiveMatchId(null)}
          >
            <motion.div
              className="bg-white dark:bg-primary p-6 rounded max-w-2xl w-full cursor-default"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              role="dialog"
              aria-modal="true"
              onClick={(e)=> e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Scorecard</h3>
                <button type="button" onClick={()=>setActiveMatchId(null)} className="text-sm px-2 py-1 rounded border transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">Close</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {match.innings.map((inn,i)=> (
                  <div key={i} className="p-2 border rounded">
                    <div className="font-medium">{inn.team}</div>
                    <div className="text-sm">{inn.runs}/{inn.wickets} ({inn.overs})</div>
                    <div className="text-xs">Top scorers and top bowlers: (demo data)</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
