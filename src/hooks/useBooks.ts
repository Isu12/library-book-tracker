
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Book, BookFormData } from "@/types/book";
import { getBooks, createBook, updateBook, deleteBook } from "@/api/books";
import { useToast } from "@/hooks/use-toast"; // Assuming this exists or similar

export function useBooks() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const addBookMutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({
        title: "Success",
        description: "Book added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookFormData }) =>
      updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({
        title: "Success",
        description: "Book updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    books,
    isLoading,
    error,
    addBook: (data: BookFormData) => addBookMutation.mutate(data),
    updateBook: (id: string, data: BookFormData) =>
      updateBookMutation.mutate({ id, data }),
    deleteBook: (id: string) => deleteBookMutation.mutate(id),
  };
}
