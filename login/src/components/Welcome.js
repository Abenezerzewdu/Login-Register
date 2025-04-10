import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css'; // We'll style the page with this CSS file

const Welcome = () => {
    const navigate = useNavigate();

    // Retrieving the username from local storage
    const userName = localStorage.getItem('userName'); // Assuming username is stored in localStorage

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('token'); // Assuming you stored the token for authentication
        navigate('/login');  // Redirecting to login page after logout
    };

    return (
        <div className="welcome-container">
            <header className="header">
                <div className="header-buttons">
                    <button onClick={() => navigate('/profile')} className="profile-button">Profile</button>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <div className="hero-container">
                <div className="hero-content">
                    <h1>Welcome, {userName}!</h1>
                    <p>We're glad to have you here. Enjoy exploring!</p>
                    <button onClick={() => navigate('/home')} className="explore-button">
                        Explore Now
                    </button>
                </div>
            </div>

            {/* Body Part Sections with Image Overlays */}
            <div className="body-sections">
                <div className="section" style={{ backgroundImage: 'url("https://example.com/section1-image.jpg")' }}>
                    <div className="overlay">
                        <h3>Body Part 1</h3>
                        <p>Discover more about body part 1.</p>
                    </div>
                </div>
                <div className="section" style={{ backgroundImage: 'url("https://example.com/section2-image.jpg")' }}>
                    <div className="overlay">
                        <h3>Body Part 2</h3>
                        <p>Learn about body part 2 here.</p>
                    </div>
                </div>
                <div className="section" style={{ backgroundImage: 'url("https://example.com/section3-image.jpg")' }}>
                    <div className="overlay">
                        <h3>Body Part 3</h3>
                        <p>Explore the wonders of body part 3.</p>
                    </div>
                </div>
                <div className="section" style={{ backgroundImage: 'url("https://example.com/section4-image.jpg")' }}>
                    <div className="overlay">
                        <h3>Body Part 4</h3>
                        <p>Find out everything about body part 4.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
