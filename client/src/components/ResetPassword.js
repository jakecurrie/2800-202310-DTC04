import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate();
    const {userID, token} = useParams();

    const [loginErrorStyle, setLoginErrorStyle] = React.useState({display: "none"});
    let userPassword = useRef(null)

    function resetPassword() {
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
            return setLoginErrorStyle({display: "block"})
          } else {
            return navigate("/login");
          }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
        <div id="reset-password-containier">
            <h1>Reset Password</h1>
            <form>
                <div>
                    <input ref={userPassword} type="password" name="password" />
                    <label htmlFor="password" >Your New Password</label>
                </div>
                <div onClick={resetPassword}>
                    <input type="button" name="submit" value="Submit"/>
                </div>
                <div id="error messages" style={loginErrorStyle}>
                    <p>Invalid Link or Expired</p>
                </div>
            </form>
        </div>
        </>
    )
}

export default ResetPassword;