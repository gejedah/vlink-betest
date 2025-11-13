import Book, { BookAttributes, BookCreationAttributes } from '../models/book.model';
import { Op } from 'sequelize';

export class BookService {
    async addBook(bookData: BookCreationAttributes, user_role: string) {
        return Book.create(bookData);
    }

    async findBook(id: string, user_role: string) {
        let gt = Op.gt;
        let book: BookAttributes | null = null;
        if (!user_role || user_role === 'customer') {
            book = await Book.findOne({
                where: {
                    id,
                    stock:
                        { gt: 0 }
                }
            });
        }
        if (user_role === 'admin') {
            book = await Book.findOne({
                where: {
                    id
                }
            });
        }
        return book;
    }

    async listBooks(user_role?: string): Promise<Book[]> {
        let gt = Op.gt;
        let books: Book[] = [];
        if (!user_role || user_role === 'customer') {
            return Book.findAll({
                where: {
                    stock:
                        { gt: 0 }
                }
            });
        }
        if (user_role === 'admin') {
            return await Book.findAll();
        }
        return books;
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
