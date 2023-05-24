import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import '../style/ResetPasswordRequest.css'

function ResetPasswordRequest() {
    const navigate = useNavigate();
    let userEmail = useRef(null)

    const [emailError, setEmailError] = React.useState({ display: "none" });
    const [resetStatus, setResetStatus] = React.useState(false);

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
                if (res.status === 400) {
                    setEmailError({display: 'block'});
                } else {
                    setResetStatus(true)
                }
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
                    {resetStatus ? (
                        <div id="reset-success-container">
                            <p id="reset-success-message">Email Sent!</p>
                            <FontAwesomeIcon className='reset-success-icon' icon={faCheckCircle}/>
                            <Link id="reset-password-link" to="/login" >&lt; Back to Login</Link>
                        </div>
                    ) : (
                        <form id="reset-password-form">
                        <div id="reset-label-input">
                            <label id="reset-password-label" >Email</label>
                            <input id="reset-password-input" ref={userEmail} name="email" type="text" />
                        </div>
                        <div id="reset-error-container" style={emailError}>
                            <p id='reset-error-message'>Invalid Email</p>
                        </div>
                        <div onClick={sendResetRequest}>
                            <input id="reset-email-submit" type="button" name="submit" value="Send Email" />
                        </div>
                        <div>
                            <Link id="reset-password-link" to="/login" >&lt; Back to Login</Link>
                        </div>
                    </form>
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default ResetPasswordRequest;