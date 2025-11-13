import { Request, Response } from 'express';
import BookService from '../services/book.service';

class BookController {
    constructor(private bookService = new BookService()) {}

    async createBook(req: Request, res: Response) {
        try {
            const bookData = req.body;
            const userRole = (typeof req.user === 'object' && req.user !== null && 'role' in req.user) ? (req.user as any).role : '';
            const newBook = await this.bookService.addBook(bookData, userRole);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getBook(req: Request, res: Response) {
        try {
            const bookId = req.params.id;
            const userRole = (typeof req.user === 'object' && req.user !== null && 'role' in req.user) ? (req.user as any).role : '';
            const book = await this.bookService.findBook(bookId, userRole);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async listBooks(req: Request, res: Response) {
        try {
            const userRole = (typeof req.user === 'object' && req.user !== null && 'role' in req.user) ? (req.user as any).role : '';
            const books = await this.bookService.listBooks(userRole);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            const bookId = req.params.id;
            const bookData = req.body;
            const role = (typeof req.user === 'object' && req.user !== null && 'role' in req.user) ? (req.user as any).role : '';
            const updatedBook = await this.bookService.modifyBook(bookId, bookData, role);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteBook(req: Request, res: Response) {
        try {
            const bookId = req.params.id;
            const userRole = (typeof req.user === 'object' && req.user !== null && 'role' in req.user) ? (req.user as any).role : '';
            const result = await this.bookService.removeBook(bookId, userRole);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default BookController;
