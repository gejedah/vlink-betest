import Book, { BookAttributes, BookCreationAttributes } from '../models/book.model';

export class BookService {
    async addBook(bookData: BookCreationAttributes, user_role: string) {
        return Book.create(bookData);
    }

    async findBook(id: string, user_role: string) {
        return Book.findByPk(id);
    }

    async listBooks(user_role?: string) {
        return Book.findAll();
    }

    async modifyBook(id: string, updatedData: Partial<BookAttributes>, user_role: string) {
        const book = await Book.findByPk(id);
        if (!book) {
            return null;
        }
        return book.update(updatedData);
    }

    async removeBook(id: string, user_role: string) {
        const deletedCount = await Book.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export default BookService;
