import React, { useEffect, useState } from 'react';
import { getClockTime } from '../utils';
import styles from './Clock.module.css';
import { FaRegClock } from "react-icons/fa";

export default function Clock() {
    const [time, setTime] = useState(getClockTime());

    useEffect(() => {
        const id = setInterval(() => setTime(getClockTime()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles.timerCard}>
            <FaRegClock className={styles.icon} />
            <span className={styles.timeText}>{time}</span>
        </div>
    );
}