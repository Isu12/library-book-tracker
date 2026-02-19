// Types for the Library Management System
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  availability: "Available" | "Checked Out";
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  availability: "Available" | "Checked Out";
}

// Validation errors type
export interface FormErrors {
  title?: string;
  author?: string;
  isbn?: string;
  genre?: string;
}
