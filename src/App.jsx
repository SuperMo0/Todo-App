import React, { useEffect, useReducer } from 'react'
import NewUserPage from './newUserPage/newUserPage.jsx'
import HomePage from './homePage/HomePage.jsx'
import { getUser } from './getUser.js'
import { reducerFunction } from './reducerFunctoin.js'

export default function App() {
    const [user, dispatch] = useReducer(reducerFunction, null, getUser)

    function handleNewUser(newUser) {
        const today = new Date().toISOString().split('T')[0];

        const defaultTasks = [
            {
                id: crypto.randomUUID(),
                title: "Welcome to your To-Do App! 👋",
                description: "This is a sample task. Click on the card to edit details, add tags, or change priorities. You can also click the circle icon to mark it as complete.",
                dueDate: today,
                dateCreated: today,
                tag: "General",
                priority: "red-card",
                status: "in progress"
            },
            {
                id: crypto.randomUUID(),
                title: "Grocery Shopping",
                description: "Buy milk, eggs, bread, and fresh vegetables for the week.",
                dueDate: today,
                dateCreated: today,
                tag: "Personal",
                priority: "yellow-card",
                status: "in progress"
            },
            {
                id: crypto.randomUUID(),
                title: "Morning Workout",
                description: "Go for a 30-minute run or hit the gym.",
                dueDate: today,
                dateCreated: today,
                tag: "Health",
                priority: "green-card",
                status: "in progress"
            },
            {
                id: crypto.randomUUID(),
                title: "Read a Book",
                description: "Read at least 20 pages of the current book before bed.",
                dueDate: today,
                dateCreated: today,
                tag: "Personal",
                priority: "yellow-card",
                status: "in progress"
            },
            {
                id: crypto.randomUUID(),
                title: "Set up Profile",
                description: "Upload a cool avatar and set your username.",
                dueDate: today,
                dateCreated: today,
                tag: "General",
                priority: "green-card",
                status: "done"
            }
        ];

        dispatch({
            type: "new user",
            name: newUser.name,
            avatar: newUser.avatar,
            taskList: defaultTasks
        })
    }

    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem("user", JSON.stringify(user))
            } catch (error) {
                console.error(error)
            }
        }
    }, [user])

    if (user) {
        return <HomePage dispatch={dispatch} user={user} />
    }

    return <NewUserPage handleNewUser={handleNewUser} />
}