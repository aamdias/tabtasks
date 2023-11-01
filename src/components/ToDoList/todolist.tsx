import ToDoItem from "../ToDoItem/todoitem";
import { useState, useEffect } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import './todolist.scss';

type Task = {
    id: number,
    title: string,
    tag: string  
}

export default function ToDoList () {
    const [ tasks, setTasks ] = useState<Task[]>([])
    const [ taskInput, setTaskInput] = useState<string>("");

    //When the component is mounted, check if there's any tasks in the session storage
    useEffect(() => {
        // Check for tasks in storage and set them
        chrome.storage.sync.get("tasks", (data) => {
            if(data.tasks){
                setTasks(data.tasks);
            }
        });
    }, []);

    // When a new task is added, the task list is updated and the input field is cleaned
    const handleAddTask = () => {
        if (taskInput.trim()) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const currentTab = tabs[0];
                if (currentTab && currentTab.title) {
                    const newTasks = [...tasks, { id: Date.now(), title: taskInput.trim(), tag: currentTab.title }];
                    setTasks(newTasks);
                    setTaskInput("");
                    chrome.storage.sync.set({ tasks: newTasks });  // Save tasks to storage
                }
            });
        }
    }

    const handleDeleteTask = (taskId:number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        chrome.storage.sync.set({ tasks: updatedTasks }); // Save updated tasks to storage
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
            {tasks.length === 0 && 
                <div className="zero-tasks-placeholder">
                    Hey! Insert your first task. What do you want to do in this tab?
                </div>
            }
            {tasks.length !== 0 &&
                <ul>
                {tasks.map(task => (
                    <ToDoItem
                        key={task.id}
                        task={task}
                        onDelete={ () => handleDeleteTask(task.id)}
                    />
                ))}
                </ul>
            }
        </>
    );
}