"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
class CartService {
    async addCart(cartData) {
        return cart_model_1.default.create(cartData);
    }
    async findCart(id) {
        return cart_model_1.default.findByPk(id);
    }
    async listCarts() {
        return cart_model_1.default.findAll();
    }
    async modifyCart(id, updatedData) {
        const cart = await cart_model_1.default.findByPk(id);
        if (!cart)
            return null;
        return cart.update(updatedData);
    }
    async removeCart(id) {
        const deletedCount = await cart_model_1.default.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
exports.CartService = CartService;
exports.default = CartService;
