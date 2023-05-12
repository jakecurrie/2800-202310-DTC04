import { React } from 'react';
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <div>
                <h1>404 Not Found</h1>
                <br/>
                <p>This page does not exist</p>
                <br/>
                <Link to="/login">Back to Homepage</Link>
            </div>
        </>
    )
};

export default NotFound;