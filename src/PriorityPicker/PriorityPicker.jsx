import React, { useState } from 'react'
import styles from './PriorityPicker.module.css'
import pstyles from './../TaskModal/TaskModal.module.css'

export default function PriorityPicker(priority) {

    const [picked, setPicked] = useState(null);

    function handleClick(priority) {
        setPicked(priority);
        priority.current = priority;
    }

    let style = {
        border: "2px solid #333333"
    }
    return (
        <div className={styles.container}>
            {picked == "red" ? <div onClick={() => { handleClick("red-card") }} style={style} className={pstyles.red} ></div> : <div onClick={() => { handleClick("red") }} className={pstyles.red} ></div>}
            {picked == "yellow" ? <div onClick={() => { handleClick("yellow-card") }} style={style} className={pstyles.yellow} ></div> : <div onClick={() => { handleClick("yellow") }} className={pstyles.yellow} ></div>}
            {picked == "green" ? <div onClick={() => { handleClick("green-card") }} style={style} className={pstyles.green} ></div> : <div onClick={() => { handleClick("green") }} className={pstyles.green} ></div>}
        </div>
    )
}
