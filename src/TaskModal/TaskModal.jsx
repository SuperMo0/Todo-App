import React, { useRef } from 'react'
import styles from './TaskModal.module.css'
import dateCreated from './../assets/date-created.png'
import date from './../assets/date.png'
import priority from './../assets/priority.png'
import status from './../assets/status.png'
import PriorityPicker from '../PriorityPicker/PriorityPicker'
import tags from './../assets/tags.png'


export default function TaskModal({ edit, task, setModal, dispatch }) {

    const title = useRef(null);
    const description = useRef(null);
    const dueDate = useRef(null);
    const tag = useRef(null);
    const priority = useRef(null);


    function click(e) {
        if (e.target == e.currentTarget) {
            task.title = title.current.textContent;
            task.description = description.current.textContent;
            task.dueDate = dueDate.current.value;
            task.tag = tag.current.textContent;
            task.priority = priority.current;
            setModal(null);
            dispatch({ type: "edit task" });
        }
    }

    return (
        <div dim={"true"} onClick={click} className={styles.dim}>
            <div className={styles.modal}>
                <div className={styles["title-section"]}>
                    {edit ? <h1 ref={title} contentEditable={true}>{task.title == "" ? "Title...." : task.title}</h1> : <h1>Big Title</h1>}
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
                    {edit ? <input ref={dueDate} type="date" /> : <p>{task.dueDate}</p>}

                    <div className={styles["meta-container"]}>
                        <img src={status} alt="" />
                        <p>Status</p>
                    </div>
                    <p>{task.status}</p>

                    <div className={styles["meta-container"]}>
                        <img src={tags} alt="" />
                        <p>Tag</p>
                    </div>
                    {edit ? <p ref={tag} contentEditable={true} > {task.tag == "" ? "empty" : task.tag} </p> : <p>{task.tag}</p>}


                    <div className={styles["meta-container"]}>
                        <img src={priority} alt="" />
                        <p>Priority</p>
                    </div>
                    {edit ? <PriorityPicker ref={priority}></PriorityPicker> : <div className={styles['red']}></div>}

                    <hr />
                    <div className={styles['description-container']}>
                        <h1>Description</h1>
                        {edit ? <p ref={description} contentEditable={true}>{task.description == "" ? "description..." : task.description}</p> : <p>{task.description}</p>
                        }
                    </div>

                </div>

                <div className={styles['buttons-container']}>
                    <button className={styles.button}> Edit Task</button>
                    <button className={styles.button}> Mark Complete</button>
                </div>


            </div>






        </div>



    )
}
