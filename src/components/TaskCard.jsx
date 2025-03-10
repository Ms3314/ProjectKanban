import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { useStore } from '../App'

const TaskCard = ({task}) => {
    const removeTodo = useStore((state) => state.removeTodo)
    const {attributes , listeners , setNodeRef , transform} = useDraggable({
        id : task.id ,
    })
    const style = transform ? {
        transform: `translate(${transform.x}px , ${transform.y}px)`
    } : undefined

    const handleDelete = () => {
        console.log("Delete button clicked for task:", task.id)
        removeTodo(task.id)
    }

  return (
    <div>
    <div ref={setNodeRef} 
        {...listeners} 
        {...attributes}
        className="h-[200px] m-3 bg-slate-300 rounded-md flex flex-col justify-between p-2"
        style={style} >
        <div>
            <h2 className="text-xl px-3 text-black font-semibold">{task.title}</h2>
            <p className="text-black px-3 text-lg">{task.description} </p>
            <button className='m-2 p-2 bg-black rounded-lg'>{task.status == 'PROCESS' ? 'UNDER PROCESS' : task.status}</button>
        </div>

        </div>
        <div className='m-2 px-2 flex flex-row gap-5'>
            <button onClick={handleDelete} className='p-1 rounded-md bg-red-800' >Delete</button>
        </div>
        </div>
  )
}

export default TaskCard