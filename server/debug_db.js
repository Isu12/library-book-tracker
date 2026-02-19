
import 'dotenv/config';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db('library-book-tracker');
        const collection = db.collection('books');

        // Test Write
        try {
            console.log('Attempting write...');
            const result = await collection.insertOne({
                title: 'Debug Write Test',
                author: 'Debug Script',
                isbn: '000-0000000000',
                genre: 'Debug',
                availability: 'Available',
                createdAt: new Date()
            });
            console.log(`Write successful! InsertedId: ${result.insertedId}`);

            // Cleanup
            await collection.deleteOne({ _id: result.insertedId });
            console.log('Cleanup successful.');

        } catch (writeErr) {
            console.error('WRITE FAILED:', writeErr);
        }

    } catch (err) {
        console.error("Connection Error:", err);
    } finally {
        await client.close();
    }
}

run();
