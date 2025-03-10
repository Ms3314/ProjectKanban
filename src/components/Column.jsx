import React from 'react'
import TaskCard from './TaskCard'
import { useDroppable } from '@dnd-kit/core'

const Column = ({data , tasks}) => {
    const {setNodeRef} = useDroppable({
        id : data.id
    })
  return (
    <div className={`${tasks.length < 2 ? 'h-screen' : 'h-full'} w-[300px]  space-y-3`}>
            <h2 className="p-2 text-lg bg-slate-300 text-black font-semibold mb-3 rounded-md inline">
              {data.title}
            </h2>
            <div ref={setNodeRef}  className={`rounded-md  border-1 flex flex-col shadow-inner gap-5 shadow-black h-full`}>
              {
                tasks.map((task)=>(
                    <TaskCard key={task.id} task={task}/>
                ))
              }
            </div>
    </div>
  )
}

export default Column