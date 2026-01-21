import React, { useState } from 'react'
import styles from './TagsPage.module.css'
import Card from '../taskCard/Card'
import { FaTags } from "react-icons/fa";

export default function TagsPage({ tasks, setModal, dispatch }) {

    const allTags = ["All", ...new Set(tasks.map(t => t.tag).filter(t => t && t.trim() !== ""))];
    const [selectedTag, setSelectedTag] = useState("All");

    const filteredTasks = selectedTag === "All"
        ? tasks
        : tasks.filter(t => t.tag === selectedTag);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1><FaTags /> Tags Filter</h1>
                <p>Filter your tasks by category</p>
            </div>

            <div className={styles.tagList}>
                {allTags.map((tag, index) => (
                    <button
                        key={index}
                        className={`${styles.tagPill} ${selectedTag === tag ? styles.active : ''}`}
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <Card
                            setModal={setModal}
                            key={task.id}
                            task={task}
                            dispatch={dispatch}
                        />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>No tasks found for "{selectedTag}"</p>
                    </div>
                )}
            </div>
        </div>
    )
}