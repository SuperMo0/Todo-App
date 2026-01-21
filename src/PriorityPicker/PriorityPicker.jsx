import React, { useState } from 'react'
import styles from './PriorityPicker.module.css'

export default function PriorityPicker({ edit, priority, priorityRef }) {
    const initialPriority = priority || "yellow-card";
    const [picked, setPicked] = useState(initialPriority);

    const options = [
        { id: "red-card", label: "High", style: styles.red },
        { id: "yellow-card", label: "Mid", style: styles.yellow },
        { id: "green-card", label: "Low", style: styles.green },
    ];

    function handleClick(id) {
        setPicked(id);
        if (priorityRef) {
            priorityRef.current = id;
        }
    }
    if (!edit) {
        const current = options.find(opt => opt.id === priority) || options[1];
        return (
            <div className={`${styles.badge} ${current.style}`}>
                {current.label}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => handleClick(option.id)}
                    className={`${styles.option} ${option.style}`}
                    data-selected={picked === option.id}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}