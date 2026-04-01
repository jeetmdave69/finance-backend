const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const recordRoutes = require('./routes/recordRoutes');
app.use('/api/records', recordRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});