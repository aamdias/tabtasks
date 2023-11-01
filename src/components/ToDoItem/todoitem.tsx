import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';   // Import trash icon
import { motion } from 'framer-motion';     // Import framer-motion

import './todoitem.scss';

type Task = {
    id:number,
    title: string
    tag: string  // the active tab's title
}

type ToDoItemProps = {
    task: Task,
    onDelete: () => void;
}

export default function ToDoItem ({task,onDelete}:ToDoItemProps) {
    const [isFinished, setFinished] = useState(false);

    const handleCheckbox = () => {
        setFinished(!isFinished);
    }

    return (
        <li className="list-item">
            <div className="checkbox-wrapper">
                <div className = "checkbox">
                    <input 
                        type="checkbox"
                        id={`checkbox-${task.id}`}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor={`checkbox-${task.id}`}></label>
                </div>
                <div className="task-text-wrapper">
                    <motion.p 
                        className={isFinished ? 'task task__finished' : 'task'}
                        initial={{ textDecoration: 'none' }}
                        animate={{ textDecoration: isFinished ? 'line-through' : 'none' }}
                        transition={{ duration: 1 }}
                    >
                        {task.title}
                    </motion.p>
                    <span className="task-tag">{task.tag}</span>
                </div>
            </div>
            <button onClick={onDelete} className= "delete-button">
                <FaTrash />  
            </button>
        </li>
    );
}
