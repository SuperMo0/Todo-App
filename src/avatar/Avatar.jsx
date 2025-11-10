import React from 'react'
import styles from './Avatar.module.css'
import { useRef } from 'react';

export default function Avatar({ avatar }) {

    const border1 = useRef(null);
    const border2 = useRef(null);
    const avatarContainer = useRef(null);

    function handleMouseEnterAvatar() {
        border1.current.style.transform = 'rotate(-1turn)';
        border2.current.style.transform = 'rotate(1turn)';
    }

    function handleMouseLeaveAvatar() {
        border1.current.style.transform = 'none';
        border2.current.style.transform = 'none';
    }
    return (
        <div onMouseEnter={handleMouseEnterAvatar} onMouseLeave={handleMouseLeaveAvatar} ref={avatarContainer} className={styles['avatar-container']}>
            <div ref={border1} className={styles['avatar-border-1']}>  </div>
            <div ref={border2} className={styles['avatar-border-2']}>  </div>
            {avatar == null ? <div className={styles.avatar}>Choose profile Photo</div> :
                <div style={{ backgroundImage: `url(${avatar})` }} className={styles.avatar}></div>
            }
        </div>
    )
}
