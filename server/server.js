
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
    next();
});

// Routes
app.use('/api/books', bookRoutes);

// Database Connection & Server Start
console.log('Starting server...');
console.log('URI:', MONGO_URI ? MONGO_URI.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED');
console.log('Server Mongoose Version:', mongoose.version);

mongoose.set('debug', true);

try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    // Log connection details
    const db = mongoose.connection.db;
    console.log(`Connected to database: ${db.databaseName}`);

    // Start listening only AFTER connection
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        // Monitor connection state (disabled for less noise)
        // setInterval(() => {
        //     const state = mongoose.connection.readyState;
        //     console.log(`[Heartbeat] ReadyState: ${state}`);
        // }, 5000);
    });

} catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
}
