import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded bodies


// Routes
app.use('/api', authRoutes);
// app.use('/api', require('./routes/songRoutes'));
// ... etc

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
