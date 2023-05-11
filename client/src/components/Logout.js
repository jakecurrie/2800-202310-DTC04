function Logout() {
    function endSession() {
        fetch('http://localhost:3001/logout', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({'endSession' : true}),
            headers: {
                "Content-Type": "application/json",
                'credentials': 'include'
            },
            credentials: 'include' // enables cookies
        })
    }

    return (
        <>
        <button onClick={endSession}>Logout</button>
        </>
    )
}

export default Logout;