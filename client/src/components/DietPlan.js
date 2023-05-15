import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

    const DietPlan = () => {
        const location = useLocation();
        const completionResult = location.state?.completionResult || '';
        console.log(completionResult);
        return (
            <div id="fitness-plan-container">
                <div id="fitness-plan-header">
                    <div>
                        <h1>Diet Plan</h1>
                        <p>{completionResult}</p>
                    </div>
                </div>
            </div>
        );
    };
    
export default DietPlan;