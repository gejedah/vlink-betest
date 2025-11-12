"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBookRoutes = void 0;
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const bookController = new book_controller_1.default();
const setBookRoutes = (app) => {
    app.post('/books', auth_middleware_1.authenticate, bookController.createBook.bind(bookController));
    app.get('/books', auth_middleware_1.authenticate, bookController.listBooks.bind(bookController));
    app.get('/books/:id', auth_middleware_1.authenticate, bookController.getBook.bind(bookController));
    app.put('/books/:id', auth_middleware_1.authenticate, bookController.updateBook.bind(bookController));
    app.delete('/books/:id', auth_middleware_1.authenticate, bookController.deleteBook.bind(bookController));
};
exports.setBookRoutes = setBookRoutes;
exports.default = exports.setBookRoutes;
