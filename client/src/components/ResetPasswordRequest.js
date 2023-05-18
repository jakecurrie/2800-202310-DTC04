import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../style/ResetPasswordRequest.css'

function ResetPasswordRequest() {
    const navigate = useNavigate();
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
                <div id="reset-top-section"></div>
                <div id="reset-bottom-section"></div>
                <div id="reset-container">
                    <h1 id="reset-title">Forgot Password?</h1>
                    <form id="reset-password-form">
                        <div id="reset-label-input">
                            <label id="reset-password-label" >Email</label>
                            <input id="reset-password-input" ref={userEmail} name="email" type="text" />
                        </div>
                        <div onClick={sendResetRequest}>
                            <input id="reset-email-submit" type="button" name="submit" value="Send Email" />
                        </div>
                        <div>
                            <Link id="reset-password-link" to="/login" >&lt; Back to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordRequest;