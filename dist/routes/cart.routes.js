"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCartRoutes = void 0;
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const cartController = new cart_controller_1.default();
const setCartRoutes = (app) => {
    app.post('/carts', auth_middleware_1.authenticate, cartController.createCart.bind(cartController));
    app.get('/carts', auth_middleware_1.authenticate, cartController.listCarts.bind(cartController));
    app.get('/carts/:id', auth_middleware_1.authenticate, cartController.getCart.bind(cartController));
    app.put('/carts/:id', auth_middleware_1.authenticate, cartController.updateCart.bind(cartController));
    app.delete('/carts/:id', auth_middleware_1.authenticate, cartController.deleteCart.bind(cartController));
};
exports.setCartRoutes = setCartRoutes;
exports.default = exports.setCartRoutes;
