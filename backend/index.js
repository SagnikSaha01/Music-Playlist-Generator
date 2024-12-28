<<<<<<< Updated upstream
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import cors from 'cors';            // if not installed, do `npm i cors`
import session from 'express-session';
import dotenv from 'dotenv';        // if not installed, do `npm i dotenv`
import connectPgSimple from 'connect-pg-simple';
import pkg from 'pg';
=======
const { OpenAI } = require('openai');
const express = require('express');
const {login, createPlaylist, logout} = require('./spotify.js');
const path = require('path');
require('dotenv').config();
>>>>>>> Stashed changes

dotenv.config();

const {Pool} = pkg;
const pgSession = connectPgSimple(session);

const app = express();
<<<<<<< Updated upstream
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded bodies
=======
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.listen(port, console.log('Server started on port: ' + port));
>>>>>>> Stashed changes

login(app);
createPlaylist(app);
logout(app);

<<<<<<< Updated upstream
// session store Pool
const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


app.use(cors({
    origin: 'http://localhost:5173',  // or wherever React is running
    credentials: true                 // allow sending cookies
  }));

app.use(
  session({
    store: new pgSession({
      pool: dbPool, // pass the pg Pool
      tableName: 'session', // the table name to store sessions
      createTableIfMissing: true // create the session table if it doesn't exist 
    }),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// Routes
app.use('/api', authRoutes);
app.use('/api', promptRoutes);
// ... etc
app.use('/', songRoutes);
app.listen(3000, () => {
    console.log("Server running on port 3000")
})
=======
/*
async function testFunction() {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: "Give me some songs I may want to listen to if I am in a excited mood" }
          ],
          max_tokens: 30,
    });
    console.log(response.choices[0].message.content);
}
*/


//testFunction();
>>>>>>> Stashed changes
