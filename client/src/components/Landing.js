import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../style/Landing.css'
import muscularImage from '../images/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club.jpg'

function Landing() {

    const navigate = useNavigate();

    function directToLogin() {
        navigate("/login");
    }

    return (
        <>
            <div className="land-body">
                <div className="land-title-section">
                    <div className="land-title-container">
                        <h1 className="land-title">ArtificialGains</h1>
                        <p className="land-title-description">
                            Improve Health and Fitness through AI
                        </p>
                        <p className="land-add-space">hdjkashdkjadkakd</p>
                        <button onClick={directToLogin} className="land-startnow">Start now</button>
                    </div>
                    <div className="land-title-image-container">
                        <img src={muscularImage} alt="muscularMan" className="land-title-image" />
                    </div>
                </div>
                <div className="land-des-section">
                    <h2 className="land-des-title">What is ArtificialGains?</h2>
                    <p className="land-des-description">
                        ArtificialGains is a website that leverages the power of GPT to provide
                        accurate advice on fitness and health, regardless of your experience
                        level. Our GPT model is trained on a vast amount of data, enabling us to
                        generate personalized plans for workout routines and diet recommendations
                        based on your unique needs and preferences. Our goal is to make reliable
                        and accurate information on fitness and health accessible to everyone.
                    </p>
                </div>
                <div className="land-why-us-section">
                    <h2 className='land-why-us-title'>Why use ArtificialGains?</h2>
                    <p className='land-why-us-description'>
                        ArtificialGains is your fitness powerhouse. Powered by advanced AI, it 
                        offers personalized workouts and diet plans, and its unique feature analyzes 
                        your food photos for nutritional values. It's the simple, free, one-stop 
                        solution to achieve your health goals. Account creation is required for a 
                        tailored experience.
                    </p>
                </div>
            </div>
        </>

    )
}

export default Landing;