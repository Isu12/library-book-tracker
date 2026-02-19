import { useState, useEffect } from "react";
import { BookFormData, FormErrors } from "@/types/book";
import { validateBookForm } from "@/utils/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BookFormData) => void;
  initialData?: BookFormData;
  mode: "add" | "edit";
}

const emptyForm: BookFormData = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  availability: "Available",
};

/**
 * Dialog form for adding or editing a book.
 * Handles local form state, validation, and submission.
 */
export function BookFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: BookFormDialogProps) {
  const [formData, setFormData] = useState<BookFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form when dialog opens or initialData changes
  useEffect(() => {
    if (open) {
      setFormData(initialData ?? emptyForm);
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (field: keyof BookFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change for better UX
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "add" ? "Add New Book" : "Edit Book"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title field */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              aria-invalid={!!errors.title}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Author field */}
          <div className="space-y-1.5">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              aria-invalid={!!errors.author}
              className={errors.author ? "border-destructive" : ""}
            />
            {errors.author && (
              <p className="text-sm text-destructive">{errors.author}</p>
            )}
          </div>

          {/* ISBN field */}
          <div className="space-y-1.5">
            <Label htmlFor="isbn">ISBN *</Label>
            <Input
              id="isbn"
              placeholder="e.g. 978-0-06-112008-4"
              value={formData.isbn}
              onChange={(e) => handleChange("isbn", e.target.value)}
              aria-invalid={!!errors.isbn}
              className={errors.isbn ? "border-destructive" : ""}
            />
            {errors.isbn && (
              <p className="text-sm text-destructive">{errors.isbn}</p>
            )}
          </div>

          {/* Genre field */}
          <div className="space-y-1.5">
            <Label htmlFor="genre">Genre *</Label>
            <Input
              id="genre"
              placeholder="e.g. Fiction, Science, History"
              value={formData.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              aria-invalid={!!errors.genre}
              className={errors.genre ? "border-destructive" : ""}
            />
            {errors.genre && (
              <p className="text-sm text-destructive">{errors.genre}</p>
            )}
          </div>

          {/* Availability select */}
          <div className="space-y-1.5">
            <Label>Availability</Label>
            <Select
              value={formData.availability}
              onValueChange={(val) =>
                handleChange("availability", val as "Available" | "Checked Out")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Checked Out">Checked Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Add Book" : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
