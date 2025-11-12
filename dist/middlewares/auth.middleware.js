"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signToken = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customer_service_1 = __importDefault(require("../services/customer.service"));
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    const token = authHeader.substring(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = payload;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
const signToken = (payload, expiresIn = 1800 * 1000) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
};
exports.signToken = signToken;
async function loginUser(email, password, device_type) {
    const customer = await customer_service_1.default.findByEmail(email);
    if (!customer) {
        throw new Error('Invalid email or password');
    }
    const passwordMatches = await bcryptjs_1.default.compare(password, customer.password);
    if (!passwordMatches) {
        throw new Error('Invalid email or password');
    }
    const payload = { id: customer.id, email: customer.email };
    const token = (0, exports.signToken)(payload);
    return { token, user: payload };
}
exports.loginUser = loginUser;
exports.default = exports.authenticate;
