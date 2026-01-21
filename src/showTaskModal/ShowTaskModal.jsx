import React from 'react'
import styles from '../editTaskModal/TaskModal.module.css'
import PriorityPicker from '../PriorityPicker/PriorityPicker'
import {
    FaCalendarAlt,
    FaCalendarCheck,
    FaTags,
    FaFlag,
    FaCheckCircle,
    FaHourglassHalf,
    FaEdit,
    FaCheck,
    FaUndo
} from "react-icons/fa";

export default function ShowTaskModal({ task, setModal, dispatch }) {

    function handleBackgroundClick(e) {
        if (e.target === e.currentTarget) {
            setModal({ type: "none", task: "" });
        }
    }

    function toggleStatus() {
        const newStatus = task.status === "done" ? "in progress" : "done";

        dispatch({
            type: "edit task",
            task: { ...task, status: newStatus }
        });

        setModal(prev => ({ ...prev, task: { ...task, status: newStatus } }));
    }

    return (
        <div className={styles.dim} onClick={handleBackgroundClick}>
            <div className={styles.modal}>

                <div className={styles.titleSection}>
                    <h2 className={styles.titleInput}>{task.title}</h2>
                </div>

                <div className={styles.metaContainer}>
                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaCalendarAlt />
                            <span>Date Created</span>
                        </div>
                        <div className={styles.metaValue}>
                            <div className={styles.readOnlyText}>
                                {task.dateCreated}
                            </div>
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaCalendarCheck />
                            <span>Due Date</span>
                        </div>
                        <div className={styles.metaValue}>
                            <div className={styles.readOnlyText}>
                                {task.dueDate || "No due date"}
                            </div>
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            {task.status === "done" ? <FaCheckCircle /> : <FaHourglassHalf />}
                            <span>Status</span>
                        </div>
                        <div className={styles.metaValue}>
                            <div className={styles.statusBadge} data-status={task.status}>
                                {task.status === "done" ? "Done" : "In Progress"}
                            </div>
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaTags />
                            <span>Tag</span>
                        </div>
                        <div className={styles.metaValue}>
                            <div className={styles.readOnlyText}>
                                {task.tag || "None"}
                            </div>
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaFlag />
                            <span>Priority</span>
                        </div>
                        <div className={styles.metaValue}>
                            <PriorityPicker edit={false} priority={task.priority} />
                        </div>
                    </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.descriptionSection}>
                    <h1>Description</h1>
                    <div className={styles.descriptionDisplay}>
                        {task.description || "No description provided."}
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button
                        onClick={() => setModal({ type: "edit", task: task })}
                        className={styles.button}
                        style={{ backgroundColor: 'white', border: '1px solid var(--subText2)', color: 'var(--text)' }}
                    >
                        <FaEdit />
                        Edit Task
                    </button>

                    <button
                        onClick={toggleStatus}
                        className={`${styles.button} ${styles.btnPrimary}`}
                    >
                        {task.status === "done" ? <FaUndo /> : <FaCheck />}
                        {task.status === "done" ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                </div>
            </div>
        </div>
    )
}