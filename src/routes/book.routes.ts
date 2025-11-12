import { Application } from 'express';
import BookController from '../controllers/book.controller';
import { authenticate } from '../middlewares/auth.middleware';

const bookController = new BookController();

export const setBookRoutes = (app: Application) => {
    app.post('/books', authenticate, bookController.createBook.bind(bookController));
    app.get('/books', authenticate, bookController.listBooks.bind(bookController));
    app.get('/books/:id', authenticate, bookController.getBook.bind(bookController));
    app.put('/books/:id', authenticate, bookController.updateBook.bind(bookController));
    app.delete('/books/:id', authenticate, bookController.deleteBook.bind(bookController));
};

export default setBookRoutes;
