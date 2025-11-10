import React from 'react'
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
export default function HomePage({ user }) {
    const name = user.name;
    const avatar = user.avatar;
    const todoList = user.todoList;

    // console.log(avatar);


    return (
        <div className={styles.page}>

            <div className={styles.header}>
                <img className={styles.gear} src={gear} alt="" />
                <img src={time} alt="" />
                <div className={styles.timer}>10:30 PM</div>
                <img src={magnifier} alt="" />
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
                <div className={styles['add-task']} >
                    <p>Add New Task</p>
                    <img src={add} alt="" />
                </div>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>

            </div>

        </div>
    )
}
