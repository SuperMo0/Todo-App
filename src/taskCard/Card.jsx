import React from 'react'
import styles from './Card.module.css'

export default function Card({ task }) {

    console.log(task);
    let status = "";
    if (task.status == 'done') status = 'done';
    else if (task.status == 'in progress') {
        if (task.priority == "red-card") status = "red-working";
        else if (task.priority == "yellow-card") status = "yellow-working"
        else if (task.priority == "green-card") status = 'green working';
    }
    if (status == "") return;
    return (
        <div className={styles[task.priority]}>
            <div style={{ display: "flex" }}>
                <p>{task.title}</p>
                <div className={styles[status]}></div>
            </div>
            <p>Tag: {task.tag}</p>
            <p>Due Date: {task.dueDate}</p>
        </div>


    )
}
