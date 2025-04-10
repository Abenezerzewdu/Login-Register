import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css'; // We'll style the page with this CSS file

const Welcome = () => {
    const navigate = useNavigate();

    // Optionally, you can retrieve the username from local storage or state management (e.g., Redux)
    const userName = localStorage.getItem('userName'); // Assuming username is stored in localStorage

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>Welcome, {userName}!</h1>
                <p>We're glad to have you here. Enjoy exploring!</p>
                <button onClick={() => navigate('/home')} className="explore-button">
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default Welcome;
