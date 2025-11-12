"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_1 = __importDefault(require("../services/cart.service"));
class CartController {
    constructor(cartService = new cart_service_1.default()) {
        this.cartService = cartService;
    }
    async createCart(req, res) {
        try {
            const cartData = req.body;
            const newCart = await this.cartService.addCart(cartData);
            res.status(201).json(newCart);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getCart(req, res) {
        try {
            const cartId = req.params.id;
            const cart = await this.cartService.findCart(cartId);
            if (cart) {
                res.status(200).json(cart);
            }
            else {
                res.status(404).json({ message: 'Cart not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async listCarts(_req, res) {
        try {
            const carts = await this.cartService.listCarts();
            res.status(200).json(carts);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateCart(req, res) {
        try {
            const cartId = req.params.id;
            const cartData = req.body;
            const updatedCart = await this.cartService.modifyCart(cartId, cartData);
            if (updatedCart) {
                res.status(200).json(updatedCart);
            }
            else {
                res.status(404).json({ message: 'Cart not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteCart(req, res) {
        try {
            const cartId = req.params.id;
            const result = await this.cartService.removeCart(cartId);
            if (result) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Cart not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = CartController;
