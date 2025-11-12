import React, { useState } from 'react'
import EditTaskModal from '../editTaskModal/EditTaskModal'
import avatar1 from './../assets/avatar1.png'
import styles from './HomePage.module.css'
import gear from './../assets/gear2.svg'
import time from './../assets/time2.svg'
import magnifier from './../assets/magnifier.svg'
import tasksLogo from './../assets/tasks.png'
import reportsLogo from './../assets/reports.png'
import tagsLogo from './../assets/tags.png'
import Avatar from '../avatar/Avatar'
import Card from '../taskCard/Card'
import add from './../assets/add.png'
import ShowTaskModal from '../showTaskModal/ShowTaskModal'
import { getClockTime } from '../utils'
export default function HomePage({ user, dispatch }) {

    const name = user.name;
    const avatar = user.avatar;
    const taskList = user.taskList;
    const [modal, setModal] = useState({ type: "none", task: "" });

    function handleNewTaskClick() {
        dispatch({ type: "create new task" });
        setModal({ type: "new", task: "new" });
    }


    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <img className={styles.gear} src={gear} alt="" />
                <img className={styles["timeIcon"]} src={time} alt="" />
                <div className={styles.timer}>{getClockTime()}</div>
                <img className={styles.magnifier} src={magnifier} alt="" />
                <input placeholder='Search Todos....' className={styles.search} type="text" />
            </div>

            <div className={styles['side-bar']}>
                <div className={styles['side-container']}>
                    <h1>MENU</h1>
                    <button className={styles['side-button']} ><img src={tasksLogo} alt="" /> My Tasks</button>

                    <button className={styles['side-button']} > <img src={tagsLogo} alt="" /> Tags</button>

                    <button className={styles['side-button']} > <img src={reportsLogo} alt="" />Reports</button>
                    <div className={styles.avatar}>
                        <Avatar avatar={avatar}></Avatar>
                    </div>
                    <p className={styles['user-name']}>{name}</p>

                    <p className={styles['logout']}>Log out</p>
                </div>
            </div>

            <div className={styles.main}>
                <h1>My Tasks</h1>
                <div onClick={handleNewTaskClick} className={styles['add-task']} >
                    <p>Add New Task</p>
                    <img src={add} alt="" />
                </div>

                {taskList.map((task =>
                    <Card setModal={setModal} key={task.id} task={task}></Card>
                ))}
            </div>

            {modal.type == 'new' && <EditTaskModal dispatch={dispatch} setModal={setModal} task={taskList[taskList.length - 1]}></EditTaskModal>}
            {modal.type == 'edit' && <EditTaskModal dispatch={dispatch} setModal={setModal} task={modal.task}></EditTaskModal>}
            {modal.type == 'show' && <ShowTaskModal dispatch={dispatch} setModal={setModal} task={modal.task}></ShowTaskModal>}

        </div>
    )
}
