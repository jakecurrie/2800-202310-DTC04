import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../style/Register.css'

const Register = () => {

    const navigate = useNavigate();

    let userName = useRef(null)
    let userEmail = useRef(null)
    let userPassword = useRef(null)

    function submitUserCreation() {
        let newUserData = {
            'name': userName.current.value,
            'email': userEmail.current.value,
            'password': userPassword.current.value
        }

        console.log(newUserData);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/register`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newUserData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            navigate("/login");
            return res.json();
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <>
            <div id="register-container">
                <div id="register-title-container">
                    <h1 id="register-title">ArtificialGains</h1>
                    <p id="register-title-description">Start your Fitness Journey here</p>
                </div>
                <div id="register-bottom-container"></div>
                <form id="register-register-form">
                    <div id="register-email-password">
                        <div id="register-name-container">
                            <label className="register-input-label" >Name</label>
                            <input className="register-input-box" ref={userName} type="text" name="name" />
                        </div>
                        <div id="register-email-container">
                            <label className="register-input-label" >Email</label>
                            <input className="register-input-box" ref={userEmail} type="text" name="email" />
                        </div>
                        <div id="register-password-container">
                            <label className="register-input-label" >Password</label>
                            <input className="register-input-box" ref={userPassword} type="password" name="password" />
                        </div>
                    </div>
                    <div id="register-submit-container" onClick={submitUserCreation}>
                        <input id="register-submit-button" type="button" name="submit" value="Sign Up" />
                    </div>
                    <div id="register-login-container">
                        <Link id="register-login-link" to="/login" >Already have an account? <span id="register-login">Login</span></Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;