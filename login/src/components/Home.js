// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'blanchedalmond', padding: '50px' }}>
            <h1>Welcome to Our Application</h1>
            <p>This application allows you to register and login.</p>
            
            <button 
                onClick={() => navigate('/login')} // Navigate to the login page
                style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px', borderRadius: '40px', background: '#3cb371', color: 'white', border: 'none' }}
            >
                Go to Login
            </button>
        </div>
    );
};

export default Home;