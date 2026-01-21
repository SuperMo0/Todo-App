import React, { useRef, useState, useEffect } from 'react'
import styles from './TaskModal.module.css'
import PriorityPicker from '../PriorityPicker/PriorityPicker'
import { getFullDate } from '../utils'
import Popup from '../popup/Popup'
import {
    FaCalendarAlt,
    FaCalendarCheck,
    FaTags,
    FaFlag,
    FaCheckCircle,
    FaHourglassHalf,
    FaChevronDown
} from "react-icons/fa";

export default function EditTaskModal({ task, setModal, dispatch, isNew, availableTags = [] }) {

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const dueDateRef = useRef(null);
    const priorityRef = useRef(task.priority);

    const [tagValue, setTagValue] = useState(task.tag || "");
    const [showTagDropdown, setShowTagDropdown] = useState(false);

    const [statusValue, setStatusValue] = useState(task.status || "in progress");
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const [popup, setPopup] = useState({
        show: false,
        message: "",
        title: "",
        onConfirm: null
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(`.${styles.tagWrapper}`)) {
                setShowTagDropdown(false);
            }
            if (!event.target.closest(`.${styles.statusWrapper}`)) {
                setShowStatusDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function getTaskData() {
        return {
            ...task,
            title: titleRef.current.textContent.trim(),
            description: descriptionRef.current.textContent.trim(),
            dueDate: dueDateRef.current.value,
            tag: tagValue.trim(),
            status: statusValue,
            priority: priorityRef.current
        };
    }

    function saveAndClose() {
        const updatedTask = getTaskData();

        if (!updatedTask.title) {
            setPopup({
                show: true,
                title: "Validation Error",
                message: "Please enter a Task Name to save.",
                onConfirm: null
            });
            return;
        }

        if (isNew) {
            dispatch({ type: "add task", task: updatedTask });
        } else {
            dispatch({ type: "edit task", task: updatedTask });
        }
        setModal({ type: "none", task: "" });
    }

    function handleDeleteClick() {
        if (isNew) {
            setModal({ type: "none", task: "" });
            return;
        }

        setPopup({
            show: true,
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this task?",
            onConfirm: () => {
                dispatch({ type: "delete task", task: task });
                setModal({ type: "none", task: "" });
            }
        });
    }

    function handleBackgroundClick(e) {
        if (e.target === e.currentTarget) {
            const updatedTask = getTaskData();

            if (!updatedTask.title) {
                setModal({ type: "none", task: "" });
            } else {
                if (isNew) {
                    dispatch({ type: "add task", task: updatedTask });
                } else {
                    dispatch({ type: "edit task", task: updatedTask });
                }
                setModal({ type: "none", task: "" });
            }
        }
    }

    const filteredTags = availableTags.filter(t =>
        t.toLowerCase().includes(tagValue.toLowerCase())
    );

    return (
        <div onClick={handleBackgroundClick} className={styles.dim}>
            {popup.show && (
                <Popup
                    title={popup.title}
                    message={popup.message}
                    onConfirm={popup.onConfirm}
                    onClose={() => setPopup({ ...popup, show: false })}
                />
            )}

            <div className={styles.modal}>
                <div className={styles.titleSection}>
                    <div
                        className={styles.titleInput}
                        ref={titleRef}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        placeholder="Untitled Task"
                    >
                        {task.title}
                    </div>
                </div>

                <div className={styles.metaContainer}>
                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaCalendarAlt /> <span>Date Created</span>
                        </div>
                        <div className={styles.metaValue}>
                            <div className={styles.readOnlyBox}>{task.dateCreated}</div>
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaCalendarCheck /> <span>Due Date</span>
                        </div>
                        <div className={styles.metaValue}>
                            <input
                                className={styles.dateInput}
                                defaultValue={task.dueDate || getFullDate()}
                                ref={dueDateRef}
                                type="date"
                            />
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            {statusValue === 'done' ? <FaCheckCircle /> : <FaHourglassHalf />}
                            <span>Status</span>
                        </div>
                        <div className={`${styles.metaValue} ${styles.statusWrapper}`}>
                            <div
                                className={styles.customSelectTrigger}
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            >
                                <span>{statusValue === 'done' ? "Done" : "In Progress"}</span>
                                <FaChevronDown className={styles.chevron} />
                            </div>

                            {showStatusDropdown && (
                                <ul className={styles.customDropdown}>
                                    <li
                                        className={styles.dropdownOption}
                                        onClick={() => {
                                            setStatusValue("in progress");
                                            setShowStatusDropdown(false);
                                        }}
                                    >
                                        <FaHourglassHalf className={styles.optionIcon} /> In Progress
                                    </li>
                                    <li
                                        className={styles.dropdownOption}
                                        onClick={() => {
                                            setStatusValue("done");
                                            setShowStatusDropdown(false);
                                        }}
                                    >
                                        <FaCheckCircle className={styles.optionIcon} /> Done
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaTags /> <span>Tag</span>
                        </div>
                        <div className={`${styles.metaValue} ${styles.tagWrapper}`}>
                            <input
                                className={styles.textInput}
                                value={tagValue}
                                onChange={(e) => {
                                    setTagValue(e.target.value);
                                    setShowTagDropdown(true);
                                }}
                                onFocus={() => setShowTagDropdown(true)}
                                placeholder="Select or type a tag..."
                            />

                            {showTagDropdown && filteredTags.length > 0 && (
                                <ul className={styles.customDropdown}>
                                    {filteredTags.map((t, i) => (
                                        <li
                                            key={i}
                                            className={styles.dropdownOption}
                                            onClick={() => {
                                                setTagValue(t);
                                                setShowTagDropdown(false);
                                            }}
                                        >
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={styles.metaRow}>
                        <div className={styles.metaLabel}>
                            <FaFlag /> <span>Priority</span>
                        </div>
                        <div className={styles.metaValue}>
                            <PriorityPicker edit={true} priority={task.priority} priorityRef={priorityRef} />
                        </div>
                    </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.descriptionSection}>
                    <h1>Description</h1>
                    <div
                        className={styles.descriptionContent}
                        ref={descriptionRef}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        placeholder="Add a description..."
                    >
                        {task.description}
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button onClick={handleDeleteClick} className={`${styles.button} ${styles.btnDanger}`}>
                        {isNew ? "Discard" : "Delete"}
                    </button>
                    <button onClick={saveAndClose} className={`${styles.button} ${styles.btnPrimary}`}>
                        Save Task
                    </button>
                </div>
            </div>
        </div>
    )
}