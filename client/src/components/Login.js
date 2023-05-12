import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
    
    const navigate = useNavigate();
    
    let userEmail = useRef(null)     
    let userPassword = useRef(null)

    const [loginError, setLoginError] = React.useState("");
    const [loginErrorStyle, setLoginErrorStyle] = React.useState({display: "none"});

    function submitUserCreation() {
        let newUserData = {
            'email': userEmail.current.value,
            'password': userPassword.current.value
        }

        fetch('https://server-service-dot-artificialgains.uw.r.appspot.com/api/login', {
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
                return navigate("/profile");
            } else if (res.status === 401) {
                setLoginErrorStyle({display: "block", marginBottom: 0})
                setLoginError("Incorrect Password") 
                console.log(res.status);
            } else {
                setLoginErrorStyle({display: "block", marginBottom: 0})
                setLoginError("Incorrect Email") 
                console.log(res.status);
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <>
        <div id="login-container">
            <h1>Login Page</h1>
            <form id="login-form">
                <div id="email-container">
                    <input ref={userEmail} type="text" name="email" />
                    <label htmlFor="email" >Your Email</label>
                </div>
                <div id="password-container">
                    <input ref={userPassword} type="password" name="password" />
                    <label htmlFor="password" >Your Password</label>
                </div>
                <div id="loginError-container" style={loginErrorStyle}>
                    <p id="loginError" style={loginErrorStyle}>{loginError}</p>
                </div>
                <div id="register-container">
                    <Link to="/register" >Register</Link>
                </div>
                <div id="forgot-container">
                    <Link to="/request-reset" >Forgot Password?</Link>
                </div>
                <div onClick={submitUserCreation}>
                    <input type="button" name="submit" value="Submit"/>
                </div>
            </form>
        </div>
        </>
    )

}

export default Login;