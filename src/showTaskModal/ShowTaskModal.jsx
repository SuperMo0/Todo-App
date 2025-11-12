import React from 'react'
import styles from '../editTaskModal/TaskModal.module.css'
import dateCreated from './../assets/date-created.png'
import date from './../assets/date.png'
import statuss from './../assets/status.png'
import PriorityPicker from '../PriorityPicker/PriorityPicker'
import tags from './../assets/tags.png'
import priorityimg from './../assets/priority.png'
import markdone from './../assets/markdone.png'
import markundone from './../assets/markundone.png'



export default function ShowTaskModal({ task, setModal, dispatch }) {

    function click(e) {
        if (e.target == e.currentTarget) {
            setModal({ type: "none", task: "" });
        }
    }
    return (
        <div dim={"true"} onClick={click} className={styles.dim}>
            <div className={styles.modal}>
                <div className={styles["title-section"]}>
                    {<div>{task.title}</div>}
                </div>
                <div className={styles.meta}>
                    <div className={styles["meta-container"]}>
                        <img src={dateCreated} alt="" />
                        <p>Date Created</p>
                    </div>
                    <p>{task.dateCreated}</p>

                    <div className={styles["meta-container"]}>
                        <img src={date} alt="" />
                        <p>Due Date</p>
                    </div>
                    <p>{task.dueDate}</p>

                    <div className={styles["meta-container"]}>
                        <img src={statuss} alt="" />
                        <p>Status</p>
                    </div>
                    <p style={{ display: "flex", gap: "8px" }}> <img src={task.status == "done" ? markdone : statuss} alt="" /> {task.status == "done" ? "Done" : "in progress"} </p>


                    <div className={styles["meta-container"]}>
                        <img src={tags} alt="" />
                        <p>Tag</p>
                    </div>
                    <p >{task.tag}</p>

                    <div className={styles["meta-container"]}>
                        <img src={priorityimg} alt="" />
                        <p>Priority</p>
                    </div>
                    <PriorityPicker edit={false} priority={task.priority}></PriorityPicker>
                    <hr />
                    <div className={styles['description-container']}>
                        <h1>Description</h1>
                        <div>{task.description}</div>
                    </div>
                </div>
                <div className={styles['buttons-container']}>
                    <button onClick={() => { setModal({ type: "edit", task: task }) }} className={styles.button}>Edit Task or delete Task</button>
                    {task.status == "in progress" && <button onClick={() => { task.status = "done"; dispatch({ type: "edit task" }) }} className={styles.button}> <img src={markdone} alt="" /> Mark as Complete</button>}
                    {task.status == "done" && <button onClick={() => { task.status = "in progress"; dispatch({ type: "edit task" }) }} className={styles.button}> <img src={markundone} alt="" /> Mark as not Complete</button>}

                </div>
            </div>

        </div>



    )



}
