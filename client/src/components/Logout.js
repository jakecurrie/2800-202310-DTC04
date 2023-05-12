import React, { navigate, useState, useEffect } from 'react';

function Logout({ setIsLoggedIn }) {
    async function endSession() {
        await fetch('https://server-service-dot-artificialgains.uw.r.appspot.com/api/logout', {
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