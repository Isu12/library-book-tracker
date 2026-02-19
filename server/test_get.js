
const API_URL = 'http://127.0.0.1:5000/api/books';

async function testGet() {
    console.log('Testing GET /api/books...');

    try {
        const response = await fetch(API_URL);
        console.log(`Status: ${response.status} ${response.statusText}`);

        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('Fetch Error:', err);
    }
}

testGet();
