import React, { useEffect, useReducer } from 'react'
import NewUserPage from './newUserPage/newUserPage.jsx'
import HomePage from './homePage/HomePage.jsx'
import { getUser } from './getUser.js'
import { reducerFunction } from './reducerFunctoin.js'

export default function App() {
    const [user, dispatch] = useReducer(reducerFunction, null, getUser)

    function handleNewUser(newUser) {
        dispatch({
            type: "new user",
            name: newUser.name,
            avatar: newUser.avatar,
            taskList: []
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