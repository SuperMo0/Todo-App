import React from 'react'
import styles from './Card.module.css'

export default function Card({ task, setModal }) {

    return (
        <div onClick={() => {
            setModal({ type: "show", task: task })
        }} className={styles[task.priority]}>
            <div style={{ display: "flex" }}>
                <p>{task.title}</p>
                <div className={styles.status} status={task.status}></div>
            </div>
            <hr />
            <p>Tag: {task.tag}</p>
            <p>Due Date: {task.dueDate}</p>
        </div>


    )
}
