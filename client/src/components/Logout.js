function Logout() {
    function endSession() {
        fetch('https://server-service-dot-artificialgains.uw.r.appspot.com/api/logout', {
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