"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
class BookService {
    addBook(bookData) {
        return book_model_1.default.create(bookData);
    }
    findBook(id) {
        return book_model_1.default.findByPk(id);
    }
    listBooks() {
        return book_model_1.default.findAll();
    }
    async modifyBook(id, updatedData) {
        const book = await book_model_1.default.findByPk(id);
        if (!book) {
            return null;
        }
        return book.update(updatedData);
    }
    async removeBook(id) {
        const deletedCount = await book_model_1.default.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
exports.BookService = BookService;
exports.default = BookService;
