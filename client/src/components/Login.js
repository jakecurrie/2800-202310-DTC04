import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../style/Login.css'

const Login = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();

    let userEmail = useRef(null)
    let userPassword = useRef(null)

    const [loginError, setLoginError] = React.useState("");
    const [loginErrorStyle, setLoginErrorStyle] = React.useState({ display: "none" });

    function submitUserCreation() {
        let newUserData = {
            'email': userEmail.current.value,
            'password': userPassword.current.value
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newUserData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include' // enables cookies

        }).then((res) => {
            console.log(res.status);
            if (res.status === 202) {
                setIsLoggedIn(true)
                return navigate("/app/home");
            } else if (res.status === 401) {
                setLoginErrorStyle({ display: "block", marginBottom: 0 })
                setLoginError("Incorrect Password")
                console.log(res.status);
            } else {
                setLoginErrorStyle({ display: "block", marginBottom: 0 })
                setLoginError("Incorrect Email")
                console.log(res.status);
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <>
            <div id="login-login-container">
                <div id="login-title-container">
                    <h1 id="login-title">ArtificialGains</h1>
                    <p id="login-title-description">Continue your Fitness Journey here</p>
                </div>
                <div id="login-bottom-container"></div>
                <form id="login-login-form">
                    <div id="login-email-password">
                        <div id="login-email-container">
                            <label className="login-input-label" >Email</label>
                            <input className="login-input-box" ref={userEmail} type="text" name="email" />
                        </div>
                        <div id="login-password-container">
                            <label className="login-input-label" >Password</label>
                            <input className="login-input-box" ref={userPassword} type="password" name="password" />
                        </div>
                        <div id="login-forgot-container">
                            <Link id="login-forgot-link" to="/request-reset" >Forgot Password?</Link>
                        </div>
                    </div>
                    <div id="login-submit-container" onClick={submitUserCreation}>
                        <input id="login-submit-button" type="button" name="submit" value="Sign In" />
                    </div>
                    <div id="login-loginError-container" style={loginErrorStyle}>
                        <p id="login-loginError" style={loginErrorStyle}>{loginError}</p>
                    </div>
                    <div id="login-register-container">
                        <Link id="login-register-link" to="/register" >Don't have an account? <span id="login-signup">Sign up</span></Link>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Login;