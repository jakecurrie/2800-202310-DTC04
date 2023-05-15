import React, { useRef, useState, useEffect } from 'react';

function ResetPasswordRequest() {
    let userEmail = useRef(null)

    function sendResetRequest() {
        let emailData = {
            'email': userEmail.current.value
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/reset-password/`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(emailData),
            headers: {
                "Content-Type": "application/json",
                'credentials': 'include'
            },
            credentials: 'include' // enables cookies
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
    <>
    <div id="reset-password-container">
        <h1>Forgot Password?</h1>
        <form id="reset-password-form">
            <input ref={userEmail} name="email" type="text"/>
            <label htmlFor="email" >Your Email</label>
            <div onClick={sendResetRequest}>
                <input type="button" name="submit" value="Submit"/>
            </div>
        </form>
    </div>
    </>
    )
}

export default ResetPasswordRequest;