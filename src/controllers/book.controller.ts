import { Request, Response } from 'express';
import BookService from '../services/book.service';

class BookController {
    constructor(private bookService = new BookService()) {}

    async createBook(req: Request, res: Response) {
        try {
            const bookData = req.body;
            const newBook = await this.bookService.addBook(bookData);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getBook(req: Request, res: Response) {
        try {
            const bookId = req.params.id;
            const book = await this.bookService.findBook(bookId);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async listBooks(_req: Request, res: Response) {
        try {
            const books = await this.bookService.listBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            const bookId = req.params.id;
            const bookData = req.body;
            const updatedBook = await this.bookService.modifyBook(bookId, bookData);
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
            const result = await this.bookService.removeBook(bookId);
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
