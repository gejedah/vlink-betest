import Book, { BookAttributes, BookCreationAttributes } from '../models/book.model';
import { Op } from 'sequelize';

export class BookService {
    async addBook(bookData: BookCreationAttributes, user_role: string) {
        if (!user_role || user_role == 'customer') {
            throw new Error('Unauthorized: Only admin can modify books');
        }
        return Book.create(bookData);
    }

    async findBook(id: string, user_role: string) {
        let book: BookAttributes | null = {} as BookAttributes;
        console.log('User role in findBook:', user_role);
        if (!user_role || user_role === 'customer') {
            book = await Book.findOne({
                where: {
                    id,
                    stock:
                        { [Op.gte]: 1 }
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
        let gt = [Op.gt];
        let books: Book[] = [];
        if (!user_role || user_role === 'customer') {
            return Book.findAll({
                where: {
                    stock:
                        { [Op.gte]: 1 }
                }
            });
        }
        if (user_role === 'admin') {
            return await Book.findAll();
        }
        return books;
    }

    async modifyBook(id: string, updatedData: Partial<BookAttributes>, user_role: string) {
        if (!user_role || user_role === 'customer') {
            throw new Error('Unauthorized: Only admin can modify books');
        }
        const book = await Book.findByPk(id);
        if (!book) {
            return null;
        }
        return book.update(updatedData);
    }

    async removeBook(id: string, user_role: string) {
        if (!user_role || user_role === 'customer') {
            throw new Error('Unauthorized: Only admin can modify books');
        }
        const deletedCount = await Book.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export default BookService;
