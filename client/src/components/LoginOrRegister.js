import { useNavigate, Link } from "react-router-dom";
import '../style/LoginOrRegister.css'
import heroImage from '../images/64671-removebg-preview.png'

function LoginOrRegister() {
    const navigate = useNavigate()

    function directToLogin() {
        navigate("/login");
    }

    function directToRegister() {
        navigate("/register");
    }

    return (
        <>
            <div className="LOR-body">
                <section className="LOR-hero-image">
                    <img className="LOR-hero-img" src={heroImage} alt="hero" />
                </section>
                <section className="LOR-choice-container">
                    <div className="LOR-title-container">
                        <h1 id="LOR-title">Start your Fitness Journey here</h1>
                    </div>
                    <div className="LOR-button-container">
                        <button onClick={directToRegister} className="LOR-logResButton" id="LOR-register-button">Register</button>
                        <button onClick={directToLogin} className="LOR-logResButton" id="LOR-login-button">Login</button>
                    </div>
                </section>
            </div>
        </>

    )
}

export default LoginOrRegister