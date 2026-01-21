import React from 'react'
import styles from './Popup.module.css'

export default function Popup({ message, onClose, onConfirm, title = "Notice" }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.message}>{message}</p>

                <div className={styles.buttonGroup}>
                    {onConfirm ? (
                        <>
                            <button onClick={onClose} className={styles.cancelButton}>
                                Cancel
                            </button>
                            <button onClick={() => { onConfirm(); onClose(); }} className={styles.deleteButton}>
                                Yes, Delete
                            </button>
                        </>
                    ) : (
                        <button onClick={onClose} className={styles.okButton}>
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}