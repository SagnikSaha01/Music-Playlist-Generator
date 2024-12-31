import express from 'express';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import cors from 'cors';            // if not installed, do `npm i cors`
import session from 'express-session';
import dotenv from 'dotenv';        // if not installed, do `npm i dotenv`
import connectPgSimple from 'connect-pg-simple';
import pkg from 'pg';

dotenv.config();

const {Pool} = pkg;
const pgSession = connectPgSimple(session);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded bodies

// login(app);
// createPlaylist(app);
// logout(app);

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
        pool: dbPool, // PostgreSQL connection pool
        tableName: 'session', // Session table name
        createTableIfMissing: true,
      }),
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Prevent JavaScript access to cookies
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
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
