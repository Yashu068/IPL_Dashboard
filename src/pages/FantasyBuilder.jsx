import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function FantasyBuilder(){
  const { players, fantasyTeam, addPlayerToFantasy, removePlayerFromFantasy, clearFantasy, reorderFantasyTeam } = useContext(AppContext)
  const [msg, setMsg] = useState('')

  const available = useMemo(()=> players.filter(p => !fantasyTeam.find(fp => fp.id === p.id)), [players, fantasyTeam])

  const onAdd = (player)=>{
    const res = addPlayerToFantasy(player)
    if(!res.ok) {
      setMsg(res.msg)
      setTimeout(()=>setMsg(''),3000)
    }
  }

  const onDragEnd = (result)=>{
    if(!result.destination) return
    if(result.destination.droppableId === 'selected' && result.source.droppableId === 'available'){
      const player = available[result.source.index]
      onAdd(player)
    }
    if(result.source.droppableId === 'selected' && result.destination.droppableId === 'available'){
      const player = fantasyTeam[result.source.index]
      removePlayerFromFantasy(player.id)
    }
    if(result.source.droppableId === 'selected' && result.destination.droppableId === 'selected'){
      reorderFantasyTeam(result.source.index, result.destination.index)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Fantasy Team Builder</h2>
        <div className="flex gap-2">
          <button onClick={clearFantasy} className="px-3 py-1 border rounded">Clear</button>
        </div>
      </div>

      {msg && <div className="mb-3 text-sm text-red-500">{msg}</div>}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-primary dark:text-white">Available Players</h3>
            <Droppable droppableId="available">
              {(provided)=> (
                <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 border rounded max-h-[60vh] overflow-auto">
                  {available.map((p, idx)=> (
                    <Draggable key={p.id} draggableId={p.id} index={idx}>
                      {(prov)=>(
                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="p-2 mb-2 border rounded flex justify-between items-center">
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted">{p.team} • {p.role}</div>
                          </div>
                          <button onClick={()=>onAdd(p)} className="px-2 py-1 bg-sporty text-white rounded">Add</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-primary dark:text-white">Selected Team ({fantasyTeam.length}/11)</h3>
            <Droppable droppableId="selected">
              {(provided)=> (
                <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 border rounded min-h-[200px]">
                  {fantasyTeam.map((p, idx)=> (
                    <Draggable key={p.id} draggableId={`sel-${p.id}`} index={idx}>
                      {(prov)=> (
                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="p-2 mb-2 border rounded flex justify-between items-center">
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted">{p.team} • {p.role}</div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={()=>removePlayerFromFantasy(p.id)} className="px-2 py-1 border rounded">Remove</button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="mt-3">
              <button className="px-4 py-2 rounded btn-sporty" onClick={()=>alert('Saved to localStorage (auto)')}>Save Team</button>
            </div>
          </div>
        </div>
      </DragDropContext>

      <div className="mt-6 text-sm text-muted">Rules: 5 batsmen, 4 bowlers, 1 wicketkeeper, 1 all-rounder (max 11).</div>
    </div>
  )
}
