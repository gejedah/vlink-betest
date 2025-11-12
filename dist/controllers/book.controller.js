"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = __importDefault(require("../services/book.service"));
class BookController {
    constructor(bookService = new book_service_1.default()) {
        this.bookService = bookService;
    }
    async createBook(req, res) {
        try {
            const bookData = req.body;
            const newBook = await this.bookService.addBook(bookData);
            res.status(201).json(newBook);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getBook(req, res) {
        try {
            const bookId = req.params.id;
            const book = await this.bookService.findBook(bookId);
            if (book) {
                res.status(200).json(book);
            }
            else {
                res.status(404).json({ message: 'Book not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async listBooks(_req, res) {
        try {
            const books = await this.bookService.listBooks();
            res.status(200).json(books);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateBook(req, res) {
        try {
            const bookId = req.params.id;
            const bookData = req.body;
            const updatedBook = await this.bookService.modifyBook(bookId, bookData);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            }
            else {
                res.status(404).json({ message: 'Book not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteBook(req, res) {
        try {
            const bookId = req.params.id;
            const result = await this.bookService.removeBook(bookId);
            if (result) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Book not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = BookController;
