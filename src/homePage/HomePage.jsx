import React, { useState } from 'react'
import EditTaskModal from '../editTaskModal/EditTaskModal'
import styles from './HomePage.module.css'
import Avatar from '../avatar/Avatar'
import Card from '../taskCard/Card'
import ShowTaskModal from '../showTaskModal/ShowTaskModal'
import Clock from '../Clock/Clock'
import { getFullDate } from '../utils'

import {
    FaCog,
    FaSearch,
    FaClipboardList,
    FaTags,
    FaChartPie,
    FaPlus,
    FaSignOutAlt
} from "react-icons/fa";

export default function HomePage({ user, dispatch }) {

    const { name, avatar, taskList } = user
    const [modal, setModal] = useState({ type: "none", task: "" })

    const existingTags = taskList.map(t => t.tag).filter(Boolean);
    const uniqueTags = [...new Set([...existingTags, "Work", "Personal", "Urgent", "Goal"])];

    function handleNewTaskClick() {
        const draftTask = {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            dueDate: "",
            dateCreated: getFullDate(),
            tag: "",
            priority: "yellow-card",
            status: "in progress"
        };


        setModal({ type: "new", task: draftTask });
    }

    function handleLogout() {
        localStorage.removeItem("user")
        window.location.reload()
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <FaCog className={styles.gear} title="Settings" />
                    <Clock />
                </div>

                <div className={styles.searchContainer}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        placeholder='Search Todos...'
                        className={styles.search}
                        type="text"
                    />
                </div>
            </div>

            <div className={styles.sidebar}>
                <div className={styles.sidebarContainer}>
                    <h1 className={styles.menuTitle}>MENU</h1>

                    <button className={styles.sideButton}>
                        <FaClipboardList className={styles.icon} />
                        <span>My Tasks</span>
                    </button>

                    <button className={styles.sideButton}>
                        <FaTags className={styles.icon} />
                        <span>Tags</span>
                    </button>

                    <button className={styles.sideButton}>
                        <FaChartPie className={styles.icon} />
                        <span>Reports</span>
                    </button>

                    <div className={styles.userInfo}>
                        <div className={styles.avatarWrapper}>
                            <Avatar avatar={avatar} />
                        </div>
                        <p className={styles.userName}>{name}</p>
                        <button onClick={handleLogout} className={styles.logout}>
                            <FaSignOutAlt /> Log out
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.mainHeader}>
                    <h1>My Tasks</h1>
                    <button onClick={handleNewTaskClick} className={styles.addTaskBtn}>
                        <span>Add New Task</span>
                        <FaPlus />
                    </button>
                </div>

                <div className={styles.grid}>
                    {taskList.map((task) => (
                        <Card setModal={setModal} key={task.id} task={task} />
                    ))}
                </div>
            </div>

            {modal.type === 'new' && (
                <EditTaskModal
                    dispatch={dispatch}
                    setModal={setModal}
                    task={modal.task}
                    isNew={true}
                    availableTags={uniqueTags}
                />
            )}
            {modal.type === 'edit' && (
                <EditTaskModal
                    dispatch={dispatch}
                    setModal={setModal}
                    task={modal.task}
                    isNew={false}
                    availableTags={uniqueTags}
                />
            )}
            {modal.type === 'show' && (
                <ShowTaskModal
                    dispatch={dispatch}
                    setModal={setModal}
                    task={modal.task}
                />
            )}
        </div>
    )
}