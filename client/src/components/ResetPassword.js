import React, { useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../style/ResetPasswordRequest.css'

function ResetPassword() {
    const navigate = useNavigate();
    const { userID, token } = useParams();

    const [linkErrorStyle, setLinkErrorStyle] = React.useState({ display: "none" });
    const [passwordErrorStyle, setPasswordErrorStyle] = React.useState({ display: "none" });

    let userPassword = useRef(null)
    let userPasswordAgain = useRef(null)

    function resetPassword() {
        if (userPassword.current.value === userPasswordAgain.current.value) {
                setPasswordErrorStyle({ display: 'none'})
            let resetData = {
                
                password: userPassword.current.value,
                userID: userID,
                token: token,
            }

            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/reset-password/${userID}/${token}`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(resetData),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include' // enables cookies
            })
                .then(async (res) => {
                    const awaitRes = await res.json()
                    if (awaitRes.errorMessage) {
                        return setLinkErrorStyle({ display: "block" })
                    } else {
                        return navigate("/login");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setPasswordErrorStyle({ display: 'block' });
        }
    }

    return (
        <>
            <div id="reset-password-container">
                <div id="reset-top-section"></div>
                <div id="reset-bottom-section"></div>
                <div id="reset-container">
                    <h1 id="reset-title">Reset Password</h1>
                    <form id="reset-password-form">
                        <div id="reset-label-input">
                            <label id="reset-password-label" >Your New Password</label>
                            <input id="reset-password-input" ref={userPassword} type="password" name="password" />
                        </div>
                        <div id="reset-label-input">
                            <label id="reset-password-label" >Your New Password Again</label>
                            <input id="reset-password-input" ref={userPasswordAgain} type="password" name="password" />
                        </div>
                        <div onClick={resetPassword}>
                            <input id="reset-password-submit" type="button" name="submit" value="Submit" />
                        </div>
                        <div className="reset-error-messages" style={passwordErrorStyle}>
                            <p>The password must be the same</p>
                        </div>
                        <div className="reset-error-messages" style={linkErrorStyle}>
                            <p>Invalid Link or Expired</p>
                        </div>
                        <Link id="reset-password-link" to="/login" >&lt; Back to Login</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;