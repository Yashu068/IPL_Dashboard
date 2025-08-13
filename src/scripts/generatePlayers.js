const fs = require('fs')
const path = require('path')

const teams = ['Mumbai Indians','Chennai Super Kings','Kolkata Knight Riders','Royal Challengers Bangalore','Delhi Capitals','Sunrisers Hyderabad','Punjab Kings','Rajasthan Royals']
const roles = ['batsman','bowler','ar','wk']
const first = ['Aarav','Vihaan','Arjun','Rohan','Kunal','Ishan','Sahil','Yash','Rudra','Kartik','Dev','Milan','Aditya']
const last = ['Sharma','Singh','Kumar','Verma','Patel','Gupta','Mehta','Reddy','Nair','Kapoor']
// Program to generate players
const players = []
for(let i=1;i<=220;i++){
  const name = `${first[Math.floor(Math.random()*first.length)]} ${last[Math.floor(Math.random()*last.length)]}`
  const team = teams[Math.floor(Math.random()*teams.length)]
  const roleProb = Math.random()
  let role = 'batsman'
  if(roleProb > 0.9) role = 'wk'
  else if(roleProb > 0.75) role = 'ar'
  else if(roleProb > 0.35) role = 'bowler'

  const matches = Math.floor(Math.random()*200)+1
  const runs = role === 'batsman' || role === 'ar' ? Math.floor(Math.random()*6000) : Math.floor(Math.random()*500)
  const wickets = role === 'bowler' || role === 'ar' ? Math.floor(Math.random()*300) : 0

  players.push({ id: 'p'+i, name, team, matches, runs, wickets, role })
}

fs.writeFileSync(path.join(__dirname, '../data/players.json'), JSON.stringify(players, null, 2))
console.log('Generated players.json with', players.length, 'players')
