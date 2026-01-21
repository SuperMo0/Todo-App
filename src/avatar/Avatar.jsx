import React from 'react'
import styles from './Avatar.module.css'

export default function Avatar({ avatar }) {
    return (
        <div className={styles.container}>
            <div className={styles.border1}></div>
            <div className={styles.border2}></div>

            {avatar ? (
                <div
                    style={{ backgroundImage: `url(${avatar})` }}
                    className={styles.image}
                />
            ) : (
                <div className={styles.placeholder}>
                    <span>Upload</span>
                </div>
            )}
        </div>
    )
}