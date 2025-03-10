import React, { useEffect } from 'react'
import { useStore } from '../App';

const SearchBar = () => {
    const handleShiftSection = useStore((state) => state.OpenCloseTodoBar);
    const [searchTerm, setSearchTerm] = React.useState("");
    const findThatTodo = useStore((state) => state.SearchTodo);
    const refreshTodos = useStore((state) => state.RefreshTodos);

    const handleSearchValue = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() === "") {
                refreshTodos(); // Show all todos if search term is empty
            } else {
                findThatTodo(searchTerm);
            }
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, findThatTodo, refreshTodos]); // Correct dependencies

    return (
        <div className="w-full flex flex-row gap-10 justify-center items-center p-10">
            <input 
                placeholder="Search for a Todo"
                value={searchTerm}
                onChange={handleSearchValue}
                type="text" 
                className="border-1 p-2 rounded-md w-[50%]" 
            />
            <button onClick={handleShiftSection} className="p-2 border-1 rounded-md">
                Add Todo
            </button>
        </div>
    );
};

export default SearchBar