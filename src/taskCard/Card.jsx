import React from 'react'
import styles from './Card.module.css'
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function Card({ task, setModal, dispatch }) {
    const priorityClass = styles[task.priority] || styles['yellow-card'];
    const isDone = task.status === 'done';

    function toggleStatus(e) {
        e.stopPropagation();

        const newStatus = isDone ? 'in progress' : 'done';
        dispatch({
            type: 'edit task',
            task: { ...task, status: newStatus }
        });
    }

    return (
        <div
            onClick={() => setModal({ type: "show", task: task })}
            className={`${styles.card} ${priorityClass} ${isDone ? styles.cardDone : ''}`}
        >
            <div className={styles.header}>
                <h3 className={styles.title}>{task.title || "Untitled Task"}</h3>

                <button
                    className={`${styles.statusBtn} ${isDone ? styles.btnDone : styles.btnPending}`}
                    onClick={toggleStatus}
                    title={isDone ? "Mark as In Progress" : "Mark as Done"}
                >
                    {isDone ? <FaCheckCircle /> : <FaRegCircle />}
                </button>
            </div>

            <p className={styles.description}>
                {task.description || "No description provided."}
            </p>

            <div className={styles.divider}></div>

            <div className={styles.footer}>
                <div className={styles.tag}>
                    <span className={styles.label}>Tag:</span>
                    <span>{task.tag || "None"}</span>
                </div>
                <div className={styles.date}>
                    <span className={styles.label}>Due:</span>
                    <span>{task.dueDate || "No Date"}</span>
                </div>
            </div>
        </div>
    )
}