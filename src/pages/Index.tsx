import { useState, useMemo } from "react";
import { Book, BookFormData } from "@/types/book";
import { useBooks } from "@/hooks/useBooks";
import { BookTable } from "@/components/BookTable";
import { BookFormDialog } from "@/components/BookFormDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, BookOpen } from "lucide-react";

/**
 * Main page for the Library Management System.
 * Handles search filtering, dialog state, and CRUD orchestration.
 */
const Index = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  // Search state — filters books by title or author
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog state for add/edit
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // RETRIEVE: Filter books based on search query (case-insensitive)
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const q = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
    );
  }, [books, searchQuery]);

  // Open dialog for adding a new book
  const handleAdd = () => {
    setEditingBook(null);
    setDialogOpen(true);
  };

  // Open dialog pre-filled for editing
  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setDialogOpen(true);
  };

  // Handle form submission (CREATE or UPDATE)
  const handleSubmit = (data: BookFormData) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
    } else {
      addBook(data);
    }
  };

  // DELETE with confirmation
  const handleDelete = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (book && window.confirm(`Delete "${book.title}"?`)) {
      deleteBook(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Library Manager</h1>
              <p className="text-sm text-muted-foreground">
                Manage your book collection with ease
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Toolbar: search + add button */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              aria-label="Search books"
            />
          </div>
          <Button onClick={handleAdd} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>

        {/* Book count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredBooks.length} of {books.length} books
        </p>

        {/* Book table (RETRIEVE) */}
        <BookTable
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* Form dialog (CREATE / UPDATE) */}
      <BookFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={
          editingBook
            ? {
                title: editingBook.title,
                author: editingBook.author,
                isbn: editingBook.isbn,
                genre: editingBook.genre,
                availability: editingBook.availability,
              }
            : undefined
        }
        mode={editingBook ? "edit" : "add"}
      />
    </div>
  );
};

export default Index;
