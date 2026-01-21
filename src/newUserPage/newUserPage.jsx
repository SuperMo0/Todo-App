import React, { useState, useRef } from 'react'
import styles from './newUserPage.module.css'
import Avatar from '../avatar/Avatar'
import avatar1 from './../assets/avatar1.png'
import avatar2 from './../assets/avatar2.png'
import avatar3 from './../assets/avatar3.png'
import avatar4 from './../assets/avatar4.png'

export default function NewUserPage({ handleNewUser }) {

    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState("");
    const fileInput = useRef(null);

    function handleFileInput(e) {
        if (e.target.files.length === 0) return;
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
        }
        reader.readAsDataURL(image);
    }

    function triggerFileUpload() {
        fileInput.current.click();
    }

    function handleGetStarted() {
        if (name.trim() === "") {
            alert("Please enter your name!");
            return;
        }
        const finalAvatar = avatar || avatar1;
        handleNewUser({ name: name, avatar: finalAvatar });
    }

    return (
        <div className={styles.page}>
            <input
                onChange={handleFileInput}
                ref={fileInput}
                className={styles.hiddenInput}
                type="file"
                accept='image/*'
            />

            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome to <span className={styles.logo}>Todo</span></h1>
                    <p className={styles.subtitle}>Let's get you set up</p>
                </div>

                <div onClick={triggerFileUpload} className={styles.avatarWrapper}>
                    <Avatar avatar={avatar} />
                    <span className={styles.uploadText}>Click to Upload Photo</span>
                </div>

                <div className={styles.presets}>
                    <p>Or choose a preset:</p>
                    <div className={styles.presetList}>
                        <img onClick={() => setAvatar(avatar1)} src={avatar1} alt="" />
                        <img onClick={() => setAvatar(avatar2)} src={avatar2} alt="" />
                        <img onClick={() => setAvatar(avatar3)} src={avatar3} alt="" />
                        <img onClick={() => setAvatar(avatar4)} src={avatar4} alt="" />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder='Enter Your Name'
                        className={styles.nameInput}
                    />
                    <button onClick={handleGetStarted} className={styles.submitBtn}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}