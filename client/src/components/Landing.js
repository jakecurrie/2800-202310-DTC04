import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../style/Landing.css'
import runningImage from '../images/pexels-kate-trifo-4024914.jpg'

function Landing() {

    const navigate = useNavigate();

    function directToLogin() {
        navigate("/profile");
    }

    return (
        <>
            <div className='land-body'>

                <section className="land-title-section">
                    <div className="land-container">
                        <div className="land-title-container">
                            <h1 className="land-title">ArtificialGains</h1>
                            <p className="land-short-description">
                                Improve Health and Fitness through AI
                            </p>
                            <button onClick={directToLogin} className="land-join-button">Join now</button>
                        </div>
                        <div className="land-image">
                        </div>
                    </div>
                </section>
                <section className="land-introduction-section">
                    <div className="land-intro-title-container">
                        <h1 className="land-intro-title">What is ArtificialGains?</h1>
                        <p className="land-intro-description">
                            ArtificialGains is a website that leverages the power of GPT to provide
                            accurate advice on fitness and health, regardless of your experience
                            level. Our GPT model is trained on a vast amount of data, enabling us to
                            generate personalized plans for workout routines and diet
                            recommendations based on your unique needs and preferences. Our goal is
                            to make reliable and accurate information on fitness and health
                            accessible to everyone.
                        </p>
                        <img
                            src={runningImage}
                            alt="run"
                            className="land-intro-image"
                        />
                    </div>
                </section>
            </div>
        </>

    )
}

export default Landing;