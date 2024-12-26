import pkg from 'pg';
import express from 'express';
import argon2 from 'argon2';
import session from 'express-session';
import env from 'dotenv';
import connectPgSimple from 'connect-pg-simple';

env.config();

const { Client } = pkg;
const pgSession = connectPgSimple(session);


const app = express();

const dbClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}); 

dbClient
  .connect()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Connection error', err.stack));


// Middleware
app.use(express.json());


export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  try {
    const result = await dbClient.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    const user = result.rows[0];

    // Check user and verify password with Argon2
    if (user && (await argon2.verify(user.passwordhash, password))) {
      console.log('User logged in:', user.username);
      req.session.userId = user.userid;
      res.status(200).json({ message: 'Logged in successfully.' });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const register = async (req, res) => {
  const { displayName, username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  try {
    // Hash password using Argon2
    const hashedPassword = await argon2.hash(password);

    await dbClient.query(
      'INSERT INTO users (displayname, username, passwordhash) VALUES ($1, $2, $3)',
      [displayName, username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    // Handle unique constraint error (duplicate username)
    if (error.code === '23505') {
      res.status(409).json({ message: 'Username already exists.' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

export const profile = async (req, res) => {
    if (req.session.userId) {
      res
        .status(200)
        .json({ message: 'You are logged in.', userId: req.session.userId });
    } else {
      res.status(401).json({ message: 'Not logged in.' });
    }
  };   

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({ message: 'Error logging out.' });
    }
      // Optionally clear the cookie (if needed)
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logged out successfully.' });
  });
};   