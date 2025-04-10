import express from 'express';
import { createConnection } from 'mysql2';
import { hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const { sign } = jwt;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);  // Detailed MySQL error
        throw err;
    }
    console.log('MySQL connected');
});

// Register route
app.post('/register', (req, res) => {
    console.log('Request Body:', req.body); // Log the incoming request body
    
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const hashedPassword = hashSync(password, 8);

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Error on the server.');

        if (results.length > 0) return res.status(400).send('User already exists.');

        // If user doesn't exist, proceed with registration
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) return res.status(500).send('Error during registration.');
            
            const token = sign({ username }, 'your_secret_key', { expiresIn: '1h' });
            res.status(200).send({ auth: true, token });
        });
    });
});


// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error querying user in the database:', err.message); // Log query error
            return res.status(500).send('Error on the server.');
        }

        if (results.length === 0) {
            return res.status(404).send('No user found.');
        }

        const user = results[0];
        const passwordIsValid = compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
