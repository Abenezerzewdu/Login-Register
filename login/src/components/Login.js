import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            console.log(response.data);
            alert('Logged in succcesfully')
            localStorage.setItem('token', response.data.token);  // Store token
            localStorage.setItem('userName', username);  // Store the username for the welcome page

            // Redirect to the Welcome page after successful login
            navigate('/welcome');
        } catch (error) {
            alert('Login failed: ' + error.response?.data || error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={styles.text}>
                Don't have an account?{' '}
                <span
                    onClick={() => navigate('/register')}
                    style={styles.link}
                >
                    Register here
                </span>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '30px',
        textAlign: 'center',
        background: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    title: {
        marginBottom: '20px',
        fontSize: '28px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    text: {
        marginTop: '20px',
        fontSize: '14px',
    },
    link: {
        color: '#007bff',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'underline',
    }
};

export default Login;
