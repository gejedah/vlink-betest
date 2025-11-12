"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCustomerRoutes = void 0;
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const customerController = new customer_controller_1.default();
const setCustomerRoutes = (app) => {
    app.post('/customers', auth_middleware_1.authenticate, customerController.createCustomer.bind(customerController));
    app.get('/customers/:id', auth_middleware_1.authenticate, customerController.getCustomer.bind(customerController));
    app.put('/customers/:id', auth_middleware_1.authenticate, customerController.updateCustomer.bind(customerController));
    app.delete('/customers/:id', auth_middleware_1.authenticate, customerController.deleteCustomer.bind(customerController));
};
exports.setCustomerRoutes = setCustomerRoutes;
exports.default = exports.setCustomerRoutes;
