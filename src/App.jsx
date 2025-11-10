import React, { useEffect } from 'react'
import NewUserPage from './newUserPage/newUserPage.jsx'
import { useState } from 'react';
import HomePage from './homePage/HomePage.jsx'
import { getUser } from './getUser.js';
export default function App() {

    const [user, setUser] = useState(getUser);

    function handleNewUser(newUser) {
        setUser(newUser);
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }

    }, [user]);

    if (user)
        return <HomePage user={user}> </HomePage>
    else {
        return (
            <NewUserPage handleNewUser={handleNewUser}></NewUserPage>
        )
    }
}
