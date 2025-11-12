"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const express_1 = __importDefault(require("express"));
const customer_routes_1 = require("./routes/customer.routes");
const book_routes_1 = require("./routes/book.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = require("./routes/auth.routes");
const cart_routes_1 = require("./routes/cart.routes");
const config_1 = __importDefault(require("./config"));
const rateLimiter_middleware_1 = require("./middlewares/rateLimiter.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Apply rate limiter globally (per IP+route)
app.use(rateLimiter_middleware_1.rateLimiterMiddleware);
(0, auth_routes_1.setAuthRoutes)(app);
(0, customer_routes_1.setCustomerRoutes)(app);
(0, book_routes_1.setBookRoutes)(app);
(0, cart_routes_1.setCartRoutes)(app);
app.use(error_middleware_1.handleError);
exports.port = config_1.default.port || 3000;
exports.default = app;
