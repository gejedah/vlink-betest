"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthRoutes = void 0;
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authController = new auth_controller_1.default();
const setAuthRoutes = (app) => {
    app.post('/auth/login', authController.login.bind(authController));
};
exports.setAuthRoutes = setAuthRoutes;
exports.default = exports.setAuthRoutes;
