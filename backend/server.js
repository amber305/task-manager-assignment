import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

import taskRouter from './routes/taskRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Enhanced CORS configuration
const corsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://task-manager-assignment-inky.vercel.app', // Your frontend domain
            'https://task-manager-assignment-seven-psi.vercel.app' // Your backend domain (for testing)
        ];

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});