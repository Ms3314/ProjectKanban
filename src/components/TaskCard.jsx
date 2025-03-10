import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { useStore } from '../App'

const TaskCard = ({task}) => {
    const removeTodo = useStore((state) => state.removeTodo)
    // this is a response for the dragable todo card 
    const {attributes , listeners , setNodeRef , transform} = useDraggable({
        id : task.id ,
    })
    const style = transform ? {
        transform: `translate(${transform.x}px , ${transform.y}px)`
    } : undefined

    // deleted the todo card from the local storage 
    const handleDelete = () => {
        console.log("Delete button clicked for task:", task.id)
        removeTodo(task.id)
    }

  return (
    <div className='relative '>
    <div className=' px-2 ml-[250px] mt-[18px] y-0 flex absolute flex-row gap-5'>
        <button onClick={handleDelete} className='p-1 rounded-md bg-red-800 w-5 h-5' ></button>
    </div>
    <div ref={setNodeRef} 
        {...listeners} 
        {...attributes}
        className="h-[200px] m-3 bg-slate-300 rounded-md flex flex-col justify-between p-2"
        style={style} >
            <div>
                <h2 className="text-xl px-3 pt-2 text-black font-semibold">{task.title.length > 25 ? (task.title.slice(0,23) + "...") : task.title  } </h2>
                <p className="text-black px-3 text-lg">{task.description.length > 80 ? (task.description.slice(0,80) + "...") : task.description } </p>
            </div>
            <button className='m-2 p-2 bg-black rounded-lg'>{task.status == 'PROCESS' ? 'UNDER PROCESS' : task.status}</button>

    </div>
    
    </div>
  )
}

export default TaskCard