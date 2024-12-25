import express from 'express';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import promptRoutes from './routes/promptRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded bodies


// Routes
app.use('/api', authRoutes);
app.use('/api', promptRoutes);
// ... etc
app.use('/', songRoutes);
app.listen(3000, () => {
    console.log("Server running on port 3000")
})
