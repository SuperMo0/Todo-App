import React, { useEffect, useReducer } from 'react'
import NewUserPage from './newUserPage/newUserPage.jsx'
import { useState } from 'react';
import HomePage from './homePage/HomePage.jsx'
import { getUser } from './getUser.js';
import { reducerFunction } from './reducerFunctoin.js'
import Avatar from './avatar/Avatar.jsx';
export default function App() {

    const [user, dispatch] = useReducer(reducerFunction, null, getUser);

    function handleNewUser(newUser) {
        dispatch({ type: "new user", name: newUser.name, avatar: newUser.avatar, taskList: [] });
    }
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }

    }, [user]);

    if (user) { return <HomePage dispatch={dispatch} user={user}> </HomePage> }
    else {
        return (
            <NewUserPage handleNewUser={handleNewUser}></NewUserPage>
        )
    }
}
