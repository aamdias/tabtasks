import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';   // Import trash icon
import { motion } from 'framer-motion';     // Import framer-motion

import './todoitem.scss';

type Task = {
    id:number,
    title: string
    tag: string,
    checked: boolean  
}

type ToDoItemProps = {
    task: Task,
    onDelete: () => void;
    onCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ToDoItem ({task,onDelete, onCheckChange}:ToDoItemProps) {
    const [isFinished, setFinished] = useState(task.checked);

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFinished(checked);
        onCheckChange(e);
    }

    return (
        <li className="list-item">
            <div className="checkbox-wrapper">
                <div className = "checkbox">
                    <input 
                        type="checkbox"
                        id={`checkbox-${task.id}`}
                        onChange={handleCheckbox}
                        checked={isFinished}
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
