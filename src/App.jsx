import { useEffect } from "react";
import { create } from "zustand";
import AddTodo from "./components/AddTodo";
import SearchBar from "./components/SearchBar";
import Column from "./components/Column";
import { DndContext } from "@dnd-kit/core";

const COLUMS = [
  {id : 'TODO' , title : 'To Do' },
  {id : 'PROCESS' , title : 'Work In Progress' },
  {id : 'REVIEW' , title : 'Peer Review' },
  {id : 'COMPLETED' , title : 'Done' }
];

// Enhanced Zustand store with task management functions
export const useStore = create((set, get) => ({
  todoBar: false,
  OpenCloseTodoBar: () => set((state) => ({ todoBar: !(state.todoBar) })),
  
  // Task management
  Todos: JSON.parse(localStorage.getItem("tasks")) || [],
  
  // Update tasks in both localStorage and state
  setTodos: (newTodos) => {
    console.log("Setting todos:", newTodos);
    localStorage.setItem('tasks', JSON.stringify(newTodos));
    set({ Todos: newTodos });
  },
  SearchTodo: (title) => {
    if(title == '' || title == undefined || title == undefined) {
      set({Todos : JSON.parse(localStorage.getItem("tasks"))})
    } else {
      const updateSearchTodo = get().Todos.filter((item)=> item.title.toLowerCase().slice(0,3) == title.toLowerCase().slice(0,3))
      set({Todos : updateSearchTodo})
    }
  },
    // Refresh todos from localStorage
  RefreshTodos: () => {
    console.log("RefreshTodos called");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Tasks from localStorage:", tasks);
    set({ Todos: tasks });
  },
  
  // Add removeTodo function
  removeTodo: (taskId) => {
    console.log("Removing todo with ID:", taskId);
    console.log("Current todos:", get().Todos);
    
    const filteredTodos = get().Todos.filter(todo => todo.id !== taskId);
    console.log("Filtered todos:", filteredTodos);
    
    localStorage.setItem("tasks", JSON.stringify(filteredTodos));
    set({ Todos: filteredTodos });
  },
  
  // Update task status (for drag and drop)
  updateTaskStatus: (taskId, newStatus) => {
    console.log(`Updating task ${taskId} to status ${newStatus}`);
    const currentTodos = get().Todos;
    const updatedTodos = currentTodos.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    
    // Save to localStorage and update state
    localStorage.setItem('tasks', JSON.stringify(updatedTodos));
    set({ Todos: updatedTodos });
  }
}));

const App = () => {
  const isAddTodoOpen = useStore((state) => state.todoBar);
  const todos = useStore((state) => state.Todos);
  const updateTaskStatus = useStore((state) => state.updateTaskStatus);
  
  // Log when todos change
  useEffect(() => {
    console.log("Todos state changed:", todos);
  }, [todos]);
  
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    
    const taskId = active.id;
    const newStatus = over.id;
    
    console.log("Dragging task:", taskId, "to status:", newStatus);
    updateTaskStatus(taskId, newStatus);
  }

  return isAddTodoOpen ? (
    <AddTodo />
  ) : (
    <div className="w-full p-10 h-auto flex-col bg-zinc-900 text-white flex items-center">
      <SearchBar />
      <div className="flex flex-row gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMS.map((item) => (
            <Column
              key={item.id}
              data={item}
              tasks={todos.filter((task) => task.status === item.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default App;
