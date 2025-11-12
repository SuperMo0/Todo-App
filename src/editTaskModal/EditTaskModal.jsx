import React, { useEffect, useRef } from 'react'
import styles from './TaskModal.module.css'
import dateCreated from './../assets/date-created.png'
import date from './../assets/date.png'
import statuss from './../assets/status.png'
import PriorityPicker from '../PriorityPicker/PriorityPicker'
import tags from './../assets/tags.png'
import priorityimg from './../assets/priority.png'
import markdone from './../assets/markdone.png'
import { getFullDate } from '../utils'

export default function EditTaskModal({ task, setModal, dispatch }) {

    const title = useRef(null);
    const description = useRef(null);
    const dueDate = useRef(null);
    const tag = useRef(null);
    const priority = useRef(task.priority);

    function click(e) {
        if (e.target == e.currentTarget) {
            task.title = title.current.textContent;
            task.description = description.current.textContent;
            task.dueDate = dueDate.current.value;
            task.tag = tag.current.textContent;
            task.priority = priority.current;
            setModal({ type: "none", task: "" });
            dispatch({ type: "edit task" });
        }
    }

    return (
        <div onClick={click} className={styles.dim}>
            <div onScroll={(e) => {
                console.log(222);
            }} className={styles.modal}>
                <div className={styles["title-section"]}>
                    {<div ref={title} contentEditable={"true"} suppressContentEditableWarning={"true"}>{task.title}</div>}
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
                    <input defaultValue={getFullDate()} ref={dueDate} type="date" />

                    <div className={styles["meta-container"]}>
                        <img src={statuss} alt="" />
                        <p>Status</p>
                    </div>
                    <p style={{ display: "flex", gap: "8px" }}> <img src={task.status == "done" ? markdone : statuss} alt="" /> {task.status == "done" ? "Done" : "in progress"} </p>

                    <div className={styles["meta-container"]}>
                        <img src={tags} alt="" />
                        <p>Tag</p>
                    </div>
                    <p ref={tag} contentEditable={true} suppressContentEditableWarning={"true"} >{task.tag}</p>

                    <div className={styles["meta-container"]}>
                        <img src={priorityimg} alt="" />
                        <p>Priority</p>
                    </div>
                    <PriorityPicker edit={true} priority={task.priority} priorityRef={priority}></PriorityPicker>
                    <hr />
                    <div className={styles['description-container']}>
                        <h1>Description</h1>
                        <div ref={description} contentEditable={true} suppressContentEditableWarning={"true"}>{task.description}</div>
                    </div>
                </div>
                <div className={styles['buttons-container']}>
                    <button onClick={() => { setModal({ type: "none", task: "" }); dispatch({ type: "delete task", task: task }) }} className={styles.button}>Delete Task</button>
                    <button className={styles.button}>Mark as Complete</button>
                </div>


            </div>

        </div>



    )
}
