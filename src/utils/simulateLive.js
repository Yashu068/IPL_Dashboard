export function simulateMatchTick(match){
  const m = { ...match }
  if(m.status !== 'ongoing') return m

  m.innings = m.innings.map((inn) => {
    if(Math.random() < 0.6){
      const runs = inn.runs + Math.floor(Math.random() * 7)
      const wickets = inn.wickets + (Math.random() < 0.12 ? 1 : 0)
      const overs = Math.round((inn.overs + (Math.random() < 0.5 ? 0.1 : 0)) * 10) / 10
      return { ...inn, runs, wickets, overs }
    }
    return inn
  })

  m.innings = m.innings.map(inn => ({ ...inn, rr: inn.overs > 0 ? +(inn.runs / inn.overs).toFixed(2) : 0 }))
  return m
}
