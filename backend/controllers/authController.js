import pkg from 'pg';
import express from 'express';
import argon2 from 'argon2';
import session from 'express-session';

const { Client } = pkg;

const app = express();

const dbClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'musicApp',
    password: 'Univariety@123',
    port: 5432,
}); 

dbClient
  .connect()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Connection error', err.stack));

// Middleware
app.use(express.json());
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

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
      if (!req.session) {
        req.session = {};
      }
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

// export const profile = async (req, res) => {
//     if (req.session.userId) {
//       res
//         .status(200)
//         .json({ message: 'You are logged in.', userId: req.session.userId });
//     } else {
//       res.status(401).json({ message: 'Not logged in.' });
//     }
//   };   

//   export const logout = async (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ message: 'Error logging out.' });
//         } else {
//           res.status(200).json({ message: 'Logged out successfully.' });
//         }
//     });
//   };   