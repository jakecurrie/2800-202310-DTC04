import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Logout({ setIsLoggedIn }) {

    const navigate = useNavigate();

    async function endSession() {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({'endSession' : true}),
            headers: {
                "Content-Type": "application/json",
                'credentials': 'include'
            },
            credentials: 'include' // enables cookies
        }).then(() => {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', false)
            return navigate("/login");
        });
    }

    return (
        <>
        <button onClick={endSession}>Logout</button>
        </>
    )
}

export default Logout;