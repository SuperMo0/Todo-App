import React, { useState, useRef } from 'react'
import EditTaskModal from '../editTaskModal/EditTaskModal'
import styles from './HomePage.module.css'
import Avatar from '../avatar/Avatar'
import Card from '../taskCard/Card'
import ShowTaskModal from '../showTaskModal/ShowTaskModal'
import Clock from '../Clock/Clock'
import TagsPage from '../tagsPage/TagsPage'
import ReportsPage from '../reportsPage/ReportsPage'
import { getFullDate } from '../utils'

import {
    FaCog,
    FaSearch,
    FaClipboardList,
    FaTags,
    FaChartPie,
    FaPlus,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaTrash,
    FaCamera,
    FaUser,
    FaFilter
} from "react-icons/fa";

export default function HomePage({ user, dispatch }) {

    const { name, avatar, taskList } = user
    const [modal, setModal] = useState({ type: "none", task: "" })
    const [currentView, setCurrentView] = useState('tasks');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Filter States
    const [searchValue, setSearchValue] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");

    const fileInputRef = useRef(null);

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

    function handleDeleteAll() {
        if (confirm("Are you sure you want to delete ALL tasks?")) {
            const emptyUser = { ...user, taskList: [] };
            localStorage.setItem("user", JSON.stringify(emptyUser));
            window.location.reload();
        }
    }

    function handleAvatarChange(e) {
        if (e.target.files.length === 0) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const newUser = { ...user, avatar: event.target.result };
            localStorage.setItem("user", JSON.stringify(newUser));
            window.location.reload();
        }
        reader.readAsDataURL(file);
    }

    // --- Main Rendering Logic with Filters ---
    function renderMainContent() {
        // 1. Filter Logic
        const tasksToDisplay = taskList.filter(t => {
            // Search
            const matchesSearch = t.title.toLowerCase().includes(searchValue.toLowerCase());

            // Status Filter
            let matchesStatus = true;
            if (filterStatus === 'active') matchesStatus = t.status === 'in progress';
            if (filterStatus === 'done') matchesStatus = t.status === 'done';

            // Priority Filter
            let matchesPriority = true;
            if (filterPriority === 'high') matchesPriority = t.priority === 'red-card' || t.priority === 'red';
            if (filterPriority === 'medium') matchesPriority = t.priority === 'yellow-card' || t.priority === 'yellow';
            if (filterPriority === 'low') matchesPriority = t.priority === 'green-card' || t.priority === 'green';

            return matchesSearch && matchesStatus && matchesPriority;
        });

        switch (currentView) {
            case 'tags':
                return <TagsPage tasks={tasksToDisplay} setModal={setModal} dispatch={dispatch} />;
            case 'reports':
                return <ReportsPage tasks={taskList} />;
            case 'tasks':
            default:
                return (
                    <>
                        <div className={styles.mainHeader}>
                            <h1>My Tasks</h1>
                            <button onClick={handleNewTaskClick} className={styles.addTaskBtn}>
                                <span>New Task</span>
                                <FaPlus />
                            </button>
                        </div>

                        <div className={styles.filterBar}>
                            <div className={styles.filterGroup}>
                                <FaFilter className={styles.filterIcon} />
                                <span className={styles.filterLabel}>Filters:</span>
                            </div>

                            <div className={styles.selectWrapper}>
                                <select
                                    className={styles.filterSelect}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active (Unfinished)</option>
                                    <option value="done">Completed</option>
                                </select>
                            </div>

                            <div className={styles.selectWrapper}>
                                <select
                                    className={styles.filterSelect}
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">High Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="low">Low Priority</option>
                                </select>
                            </div>

                            {(filterStatus !== 'all' || filterPriority !== 'all') && (
                                <button
                                    className={styles.clearFilters}
                                    onClick={() => { setFilterStatus('all'); setFilterPriority('all'); }}
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className={styles.grid}>
                            {tasksToDisplay.length > 0 ? (
                                tasksToDisplay.map((task) => (
                                    <Card
                                        setModal={setModal}
                                        key={task.id}
                                        task={task}
                                        dispatch={dispatch}
                                    />
                                ))
                            ) : (
                                <div className={styles.emptyState}>
                                    <p>No tasks found matching filters.</p>
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    }

    return (
        <div className={styles.page}>
            <div
                className={`${styles.overlay} ${isSidebarOpen ? styles.showOverlay : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.logo}>ToDo.</h2>
                    <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                <div className={styles.sidebarContainer}>
                    <h1 className={styles.menuTitle}>MENU</h1>
                    <button
                        className={`${styles.sideButton} ${currentView === 'tasks' ? styles.active : ''}`}
                        onClick={() => { setCurrentView('tasks'); setIsSidebarOpen(false); }}
                    >
                        <FaClipboardList className={styles.icon} />
                        <span>My Tasks</span>
                    </button>
                    <button
                        className={`${styles.sideButton} ${currentView === 'tags' ? styles.active : ''}`}
                        onClick={() => { setCurrentView('tags'); setIsSidebarOpen(false); }}
                    >
                        <FaTags className={styles.icon} />
                        <span>Tags</span>
                    </button>
                    <button
                        className={`${styles.sideButton} ${currentView === 'reports' ? styles.active : ''}`}
                        onClick={() => { setCurrentView('reports'); setIsSidebarOpen(false); }}
                    >
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

            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <button className={styles.burgerBtn} onClick={() => setIsSidebarOpen(true)}>
                        <FaBars />
                    </button>

                    <div className={styles.searchContainer}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            placeholder='Search tasks...'
                            className={styles.search}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <div className={styles.headerRight}>
                        <Clock />
                        <div className={styles.settingsWrapper}>
                            <button
                                className={`${styles.gearBtn} ${showSettings ? styles.gearActive : ''}`}
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <FaCog />
                            </button>
                            {showSettings && (
                                <div className={styles.settingsDropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <FaUser className={styles.dropdownIcon} />
                                        <span>{name}</span>
                                    </div>
                                    <div className={styles.dropdownDivider}></div>
                                    <button onClick={() => fileInputRef.current.click()} className={styles.dropdownItem}>
                                        <FaCamera />
                                        <span>Change Avatar</span>
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                    <button onClick={handleDeleteAll} className={`${styles.dropdownItem} ${styles.dangerItem}`}>
                                        <FaTrash />
                                        <span>Delete All Tasks</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.main}>
                    {renderMainContent()}
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