import express from 'express';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import cors from 'cors';            // if not installed, do `npm i cors`


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded bodies

app.use(cors({
    origin: 'http://localhost:5173',  // or wherever React is running
    credentials: true                 // allow sending cookies
  }));

// Routes
app.use('/api', authRoutes);
app.use('/api', promptRoutes);
// ... etc
app.use('/', songRoutes);
app.listen(3000, () => {
    console.log("Server running on port 3000")
})
