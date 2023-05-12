import React, { useState, useEffect } from 'react';

function Logout({ setIsLoggedIn }) {
    async function endSession() {
        await fetch('http://localhost:3001/logout', {
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
        });
    }

    return (
        <>
        <button onClick={endSession}>Logout</button>
        </>
    )
}

export default Logout;