import ToDoItem from "../ToDoItem/todoitem";
import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import './todolist.scss';

type Task = {
    id: number,
    title: string,
}

export default function ToDoList () {
    const [ tasks, setTasks ] = useState<Task[]>([])
    const [ taskInput, setTaskInput] = useState<string>("");

    // When a new task is added, the task list is updated and the input field is cleaned
    const handleAddTask = () => {
        if(taskInput.trim()){
            setTasks([...tasks,{id:Date.now(),title:taskInput.trim()}]),
            setTaskInput("");
        }
    }

    const handleDeleteTask = (taskId:number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            handleAddTask();
        }
    }

    return(
        <>
            <div className = "input-wrapper">
                <input 
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Add new task..."
                    className="input-todo"
                ></input>
                <button onClick={handleAddTask} className="input-button">
                    <BsPlusCircle />
                </button>
            </div>

            <ul>
                {tasks.map(task => (
                    <ToDoItem
                        key={task.id}
                        task={task}
                        onDelete={ () => handleDeleteTask(task.id)}
                    />
                ))}
            </ul>
        </>
    );
}