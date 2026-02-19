import { Book } from "@/types/book";

// Sample book data for initial rendering
export const sampleBooks: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    genre: "Fiction",
    availability: "Available",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-45-152493-5",
    genre: "Dystopian",
    availability: "Checked Out",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-74-327356-5",
    genre: "Classic",
    availability: "Available",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    genre: "Romance",
    availability: "Available",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-31-676948-0",
    genre: "Fiction",
    availability: "Checked Out",
  },
];
