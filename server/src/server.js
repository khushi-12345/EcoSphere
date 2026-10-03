const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contentRoutes = require('./routes/contentRoutes');
const carbonRoutes = require('./routes/carbonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/dashboard', dashboardRoutes);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/carbon', carbonRoutes);
app.use('/api/quizzes', quizRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('EcoSphere API is running...');
});

const PORT = process.env.PORT || 5000;
app.use('/api/content', contentRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));