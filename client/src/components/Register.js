import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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

        fetch('http://localhost:3001/register', {
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
        <div id="register-container">
            <form id="register-form">
                <div id="name-container">
                    <input ref={userName} type="text" name="name" />
                    <label htmlFor="name" >Your Name</label>
                </div>
                <div id="email-container">
                    <input ref={userEmail} type="text" name="email" />
                    <label htmlFor="email" >Your Email</label>
                </div>
                <div id="password-container">
                    <input ref={userPassword} type="password" name="password" />
                    <label htmlFor="password" >Your Password</label>
                </div>
                <div onClick={submitUserCreation}>
                    <input type="button" name="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
};

export default Register;