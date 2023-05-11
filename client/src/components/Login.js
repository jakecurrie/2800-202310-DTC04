import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    
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

        fetch('http://localhost:3001/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newUserData),
            headers: {
                "Content-Type": "application/json",
                'credentials': 'include'
            },
            credentials: 'include' // enables cookies

        }).then((res) => {
            console.log(res.status);
            if (res.status === 202) {
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
                <div onClick={submitUserCreation}>
                    <input type="button" name="submit" value="Submit"/>
                </div>
            </form>
        </div>
        </>
    )

}

export default Login;