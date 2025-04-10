// server.js
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
    if (err) throw err;
    console.log('MySQL connected');
});

// Register route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashSync(password, 8);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(500).send("User already exists.");
        const token = sign({ username }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send("Error on the server.");
        if (results.length === 0) return res.status(404).send("No user found.");

        const user = results[0];
        const passwordIsValid = compareSync(password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});