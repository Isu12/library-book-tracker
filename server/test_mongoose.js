
import 'dotenv/config';
import mongoose from 'mongoose';
import Book from './models/Book.js';

const MONGO_URI = process.env.MONGO_URI;

mongoose.set('debug', true);

async function run() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected! ReadyState:', mongoose.connection.readyState);

        console.log('Querying books...');
        const books = await Book.find().limit(5);
        console.log('Books found:', books.length);
        console.log(JSON.stringify(books, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
