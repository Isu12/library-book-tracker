
// Native fetch is available in Node 18+

const API_URL = 'http://127.0.0.1:5000/api/books';

async function testAPI() {
    console.log('Testing API with new schema...');

    // 1. Create a book
    console.log('1. Creating a book...');
    const newBook = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        genre: 'Classic Fiction',
        availability: 'Available'
    };

    let createdBookId;

    try {
        const createRes = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        });

        if (!createRes.ok) {
            const errorText = await createRes.text();
            throw new Error(`Create failed: ${createRes.status} ${createRes.statusText} - ${errorText}`);
        }
        const createdBook = await createRes.json();
        console.log('Created Book:', createdBook);
        createdBookId = createdBook.id; // Using virtual 'id'
    } catch (err) {
        console.error('Create Error:', err);
        return;
    }

    // 2. Get all books
    console.log('\n2. Getting all books...');
    try {
        const getAllRes = await fetch(API_URL);
        const books = await getAllRes.json();
        console.log(`Retrieved ${books.length} books.`);
    } catch (err) {
        console.error('Get All Error:', err);
    }

    // 3. Update the book
    console.log('\n3. Updating the book...');
    try {
        const updateRes = await fetch(`${API_URL}/${createdBookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ availability: 'Checked Out' })
        });
        const updatedBook = await updateRes.json();
        console.log('Updated Book:', updatedBook);
    } catch (err) {
        console.error('Update Error:', err);
    }

    // 4. Delete the book
    console.log('\n4. Deleting the book...');
    try {
        const deleteRes = await fetch(`${API_URL}/${createdBookId}`, {
            method: 'DELETE'
        });
        const deleteResult = await deleteRes.json();
        console.log('Delete Result:', deleteResult);
    } catch (err) {
        console.error('Delete Error:', err);
    }
}

testAPI();
