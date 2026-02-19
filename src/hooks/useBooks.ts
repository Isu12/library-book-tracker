import { useState, useCallback } from "react";
import { Book, BookFormData } from "@/types/book";
import { sampleBooks } from "@/data/sampleBooks";

/**
 * Custom hook to manage all CRUD operations for books.
 * Encapsulates state management and provides clean API for components.
 */
export function useBooks() {
  const [books, setBooks] = useState<Book[]>(sampleBooks);

  // CREATE: Add a new book with a unique ID
  const addBook = useCallback((data: BookFormData) => {
    const newBook: Book = {
      ...data,
      id: Date.now().toString(),
    };
    setBooks((prev) => [...prev, newBook]);
  }, []);

  // UPDATE: Replace an existing book's data by ID
  const updateBook = useCallback((id: string, data: BookFormData) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...data } : book))
    );
  }, []);

  // DELETE: Remove a book by ID
  const deleteBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  }, []);

  return { books, addBook, updateBook, deleteBook };
}
