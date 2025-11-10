import React, { useState } from 'react'
import styles from './newUserPage.module.css'
import { useRef } from 'react'
import { useEffect } from 'react';
import avatar1 from './../assets/avatar1.png'
import avatar2 from './../assets/avatar2.png'
import avatar3 from './../assets/avatar3.png'
import avatar4 from './../assets/avatar4.png'

export default function NewUserPage({ handleNewUser }) {

    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState("");
    const border1 = useRef(null);
    const border2 = useRef(null);
    const avatarContainer = useRef(null);
    const fileInput = useRef(null);

    function handleNameInput(e) {
        setName(e.target.value)
    }

    function handleMouseEnterAvatar() {
        border1.current.style.transform = 'rotate(-1turn)';
        border2.current.style.transform = 'rotate(1turn)';
    }

    function handleMouseLeaveAvatar() {
        border1.current.style.transform = 'none';
        border2.current.style.transform = 'none';
    }
    function handleFileInput(e) {
        if (e.target.files.length == 0) return;
        let image = e.target.files[0];

        let reader = new FileReader();
        reader.onload = (image) => {
            handleAvatarInput(image.target.result);
        }

        reader.readAsDataURL(image);
    }

    function handleAvatarInput(image) {
        setAvatar(image);
        border1.current.style.transform = 'rotate(-1turn)';
        border2.current.style.transform = 'rotate(1turn)';
        setTimeout(() => {
            if (border1.current == null) return;
            border1.current.style.transform = 'none';
            border2.current.style.transform = 'none';
        }, 1000)
    }

    function handleAvatarFile() {
        fileInput.current.click();
    }

    function handleGetStarted() {
        if (!avatar) return;
        if (name.trim() == "") return;
        else handleNewUser({ name: name, avatar: avatar, todoList: [] });
    }

    return (
        <div className={styles.page}>
            <input onChange={handleFileInput} ref={fileInput} className={styles['file-input']} type="file" accept='image/*' />
            <div className={styles.modal} >
                <h1 className={styles.text1}>WELCOME TO <span className={styles.logo}>ToDo</span> </h1>
                <div onMouseEnter={handleMouseEnterAvatar} onMouseLeave={handleMouseLeaveAvatar} ref={avatarContainer} className={styles['avatar-container']}>
                    <div ref={border1} className={styles['avatar-border-1']}>  </div>
                    <div ref={border2} className={styles['avatar-border-2']}>  </div>
                    {avatar == null ? <div onClick={handleAvatarFile} className={styles.avatar}>Choose profile Photo</div> :
                        <div onClick={handleAvatarFile} style={{ backgroundImage: `url(${avatar})` }} className={styles.avatar}></div>
                    }
                </div>
                <p className={styles['pick-text']}>or Choose from Library</p>
                <div className={styles['avatars-list']}>
                    <ul>
                        <li onClick={(e) => { handleAvatarInput(avatar1) }}> <img src={avatar1} alt="" /></li>
                        <li onClick={(e) => { handleAvatarInput(avatar2) }}> <img src={avatar2} alt="" /></li>
                        <li onClick={(e) => { handleAvatarInput(avatar3) }}> <img src={avatar3} alt="" /></li>
                        <li onClick={(e) => { handleAvatarInput(avatar4) }}> <img src={avatar4} alt="" /></li>
                    </ul>
                </div>
                <div className={styles['name-input-ready']}>
                    <input value={name} onChange={handleNameInput} type="text" placeholder='Enter Your Name' />
                    <button onClick={handleGetStarted} className={styles['get-started']}>Get Started </button>
                </div>

            </div>
        </div>
    )
}
