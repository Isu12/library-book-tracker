import { BookFormData, FormErrors } from "@/types/book";

/**
 * Validates the book form data and returns any errors.
 * All fields except availability are required.
 * ISBN must follow a basic pattern.
 */
export function validateBookForm(data: BookFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.trim().length > 200) {
    errors.title = "Title must be less than 200 characters";
  }

  if (!data.author.trim()) {
    errors.author = "Author is required";
  } else if (data.author.trim().length > 100) {
    errors.author = "Author must be less than 100 characters";
  }

  if (!data.isbn.trim()) {
    errors.isbn = "ISBN is required";
  } else if (!/^[\d\-]{10,17}$/.test(data.isbn.trim())) {
    errors.isbn = "Enter a valid ISBN (10-17 digits/dashes)";
  }

  if (!data.genre.trim()) {
    errors.genre = "Genre is required";
  }

  return errors;
}
