import React from 'react'
import { useStore } from '../App';
import { useState } from 'react';

// responsibel for adding a todo 
const AddTodo = () => {
    const handleShiftSection = useStore((state) => state.OpenCloseTodoBar);
    const updateGloalTodoState = useStore((state) => state.RefreshTodos)
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const handleCreateTodo = () => {
        if (!taskName.trim()) {
            alert("Task name cannot be empty");
            return;
        }
        
        const newTask = {
            id: Date.now().toString(),
            title: taskName,
            description: taskDescription,
            status: 'TODO',
        }
        
        console.log("Creating new task:", newTask);
        
        let existingTasks = [];
        try {
            const storedTasks = localStorage.getItem("tasks");
            console.log("Retrieved from localStorage:", storedTasks);
            if (storedTasks) {
                existingTasks = JSON.parse(storedTasks);
            }
            console.log("Existing tasks:", existingTasks);
        } catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
        }
        
        // Add the new task to the array
        const updatedTasks = [...existingTasks, newTask];
        console.log("Updated tasks array:", updatedTasks);
        
        // Save the updated array back to localStorage
        try {
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            console.log("Successfully saved to localStorage");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
        
        // Clear the form
        setTaskName("");
        setTaskDescription("");
        
        // Update global state and close the form
        console.log("Updating global state");
        updateGloalTodoState();
        handleShiftSection();
    };
  return (
        <div  className="w-full min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="border-1 shadow-md p-8 rounded-xl shadow-lg w-[40%] space-y-6">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-2xl font-semibold">Create Todo</h2>
                <button onClick={handleShiftSection} className="text-xl font-bold">
                X
                </button>
            </div>
            <div>
                <label htmlFor="taskName" className="block mb-1 text-sm font-medium">
                Task Name
                </label>
                <input
                id="taskName"
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full p-2 rounded-md text-white border-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="taskDescription" className="block mb-1 text-sm font-medium">
                Task Description
                </label>
                <textarea
                id="taskDescription"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full min-h-[200px] p-2 rounded-md border-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-center">
                <button
                onClick={handleCreateTodo}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                Create Todo
                </button>
            </div>
            </div>
        </div>  
      )
}

export default AddTodo