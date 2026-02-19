import { Book } from "@/types/book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

/**
 * Responsive table displaying all book records.
 * Each row has Edit and Delete action buttons.
 */
export function BookTable({ books, onEdit, onDelete }: BookTableProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">No books found</p>
        <p className="text-sm">Add a book or adjust your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Author</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">ISBN</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Genre</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id} className="group">
              <TableCell className="font-medium max-w-[200px] truncate">
                {book.title}
              </TableCell>
              <TableCell className="text-muted-foreground">{book.author}</TableCell>
              <TableCell className="text-muted-foreground hidden sm:table-cell font-mono text-sm">
                {book.isbn}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary" className="font-normal">
                  {book.genre}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={book.availability === "Available" ? "default" : "outline"}
                  className={
                    book.availability === "Available"
                      ? "bg-success text-success-foreground border-success"
                      : "text-warning border-warning"
                  }
                >
                  {book.availability}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(book)}
                    aria-label={`Edit ${book.title}`}
                    className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(book.id)}
                    aria-label={`Delete ${book.title}`}
                    className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
