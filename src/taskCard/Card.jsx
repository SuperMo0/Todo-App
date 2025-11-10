import React from 'react'
import styles from './Card.module.css'

export default function Card() {
    return (
        <div className={styles['card-container']}>

            <div className={styles['yellow-card']}>

                <div style={{ display: "flex" }}>
                    <p>Develop API</p>
                    <div className={styles['yellow-working']}></div>
                </div>
                <p>Tag: Web Development</p>
                <p>Mon,Oct 26</p>
            </div>

        </div>
    )
}
