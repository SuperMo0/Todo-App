import React from 'react'
import styles from './ReportsPage.module.css'
import { FaTasks, FaCheckCircle, FaHourglassHalf, FaChartPie } from "react-icons/fa";

export default function ReportsPage({ tasks }) {

    const total = tasks.length;
    const done = tasks.filter(t => t.status === "done").length;
    const inProgress = tasks.filter(t => t.status === "in progress").length;

    const highPriority = tasks.filter(t => t.priority === "red-card" || t.priority === "red").length;

    const percentDone = total === 0 ? 0 : Math.round((done / total) * 100);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1><FaChartPie /> Dashboard</h1>
                <p>Overview of your productivity</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.card}>
                    <div className={`${styles.iconBox} ${styles.blue}`}>
                        <FaTasks />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>Total Tasks</h3>
                        <h2>{total}</h2>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={`${styles.iconBox} ${styles.green}`}>
                        <FaCheckCircle />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>Completed</h3>
                        <h2>{done}</h2>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={`${styles.iconBox} ${styles.yellow}`}>
                        <FaHourglassHalf />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>In Progress</h3>
                        <h2>{inProgress}</h2>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={`${styles.iconBox} ${styles.red}`}>
                        <FaChartPie />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3>High Priority</h3>
                        <h2>{highPriority}</h2>
                    </div>
                </div>
            </div>
            <div className={styles.progressSection}>
                <h2>Completion Rate</h2>
                <div className={styles.progressBarBg}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${percentDone}%` }}
                    ></div>
                </div>
                <p>{percentDone}% of tasks completed</p>
            </div>
        </div>
    )
}