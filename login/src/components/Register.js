// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/register', {
            username,
            password
          },{
            headers:{
                'content-Type':'application/json'
            }
          });
          console.log(response.data)
    
          alert('Registered successfully! ');
        setUserName('');
        setPassword('');

        navigate('/login')
        } catch (error) {
          alert('Registration failed: ' + error.response?.data || error.message);
        }
      };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="text"
                    placeholder="userName"
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
                <button type="submit" style={styles.button}>Register</button>
            </form>
            <p style={styles.text}>
                Already registered?{' '}
                <span
                    onClick={() => navigate('/login')}
                    style={styles.link}
                >
                    Login here
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

export default Register;
