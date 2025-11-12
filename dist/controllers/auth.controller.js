"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthController {
    async login(req, res) {
        const { email, password, device_type } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (!device_type) {
            return res.status(400).json({ message: 'Need device_type' });
        }
        const responsee = await (0, auth_middleware_1.loginUser)(email, password, device_type);
        return res.status(200).json({ ...responsee });
    }
}
exports.default = AuthController;
