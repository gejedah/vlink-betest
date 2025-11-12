import Book, { BookAttributes, BookCreationAttributes } from '../models/book.model';

export class BookService {
    addBook(bookData: BookCreationAttributes) {
        return Book.create(bookData);
    }

    findBook(id: string) {
        return Book.findByPk(id);
    }

    listBooks() {
        return Book.findAll();
    }

    async modifyBook(id: string, updatedData: Partial<BookAttributes>) {
        const book = await Book.findByPk(id);
        if (!book) {
            return null;
        }
        return book.update(updatedData);
    }

    async removeBook(id: string) {
        const deletedCount = await Book.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export default BookService;
