import React, { useState } from 'react'
import styles from './PriorityPicker.module.css'

export default function PriorityPicker({ edit, priority, priorityRef }) {

    const [picked, setPicked] = useState(priority);

    function handleClick(priority) {
        setPicked(priority);
        priorityRef.current = priority;
    }

    if (edit)
        return (
            <div className={styles.container}>
                <div onClick={() => { handleClick("red-card") }} className={styles.red} picked={String(picked == 'red-card')} >high</div>
                <div onClick={() => { handleClick("yellow-card") }} className={styles.yellow} picked={String(picked == 'yellow-card')} >mid</div>
                <div onClick={() => { handleClick("green-card") }} className={styles.green} picked={String(picked == 'green-card')} >low</div>
            </div>
        )
    else {
        if (priority == "red-card") return <div className={styles.red}>high</div>
        else if (priority == "yellow-card") return <div className={styles.yellow}>mid</div>
        else if (priority == "green-card") return <div className={styles.green}>low</div>
    }
}
