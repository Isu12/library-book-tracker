
import Book from '../models/Book.js';

// Get all books
export const getBooks = async (req, res) => {
    try {
        console.log('GET /api/books called');
        const books = await Book.find().sort({ createdAt: -1 });
        console.log(`Found ${books.length} books`);
        res.status(200).json(books);
    } catch (error) {
        console.error('Error in getBooks:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single book
export const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
export const createBook = async (req, res) => {
    console.log('POST /api/books called');
    console.log('Request body:', req.body);
    const book = new Book(req.body);
    try {
        const newBook = await book.save();
        console.log('Book created:', newBook);
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
