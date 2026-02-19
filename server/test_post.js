
const API_URL = 'http://127.0.0.1:5000/api/books';

async function testPost() {
    console.log('Testing POST /api/books...');

    const newBook = {
        title: 'Test Validate Book',
        author: 'Test Validate Author',
        isbn: '978-0-123456-47-2',
        genre: 'Test Genre',
        availability: 'Available'
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            const text = await response.text();
            console.log('Error Response Body:', text);
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        console.log(`Status: ${response.status} ${response.statusText}`);
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('Fetch Error:', err);
    }
}

testPost();
