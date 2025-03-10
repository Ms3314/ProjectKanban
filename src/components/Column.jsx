import React from 'react'
import TaskCard from './TaskCard'
import { useDroppable } from '@dnd-kit/core'
// provides column for the whole interface
const Column = ({data , tasks}) => {
    const {setNodeRef} = useDroppable({
        id : data.id
    })
  return (
    <div className={` w-[300px]  space-y-3`}>
            <h2 className="p-2 text-lg bg-slate-300 text-black font-semibold mb-3 rounded-md inline">
              {data.title}
            </h2>
            <div ref={setNodeRef}  className={`rounded-md ${tasks.length == 0 && 'h-[200px]' } border-1 flex flex-col  shadow-inner  shadow-black `}>
              {
                tasks.length == 0 && (
                    <p className='text-md ml-5 mt-10 font-bold text-slate-500'>No {data.title} yet !!</p>
                )
              }
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