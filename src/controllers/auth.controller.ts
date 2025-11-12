import { Request, Response } from 'express';
import { loginUser } from '../middlewares/auth.middleware';

class AuthController {
    async login(req: Request, res: Response) {
        const { email, password, device_type } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!device_type) {
            return res.status(400).json({ message: 'Need device_type' });
        }

        const responsee = await loginUser(email, password, device_type);

        return res.status(200).json({ ...responsee });
    }
}

export default AuthController;
