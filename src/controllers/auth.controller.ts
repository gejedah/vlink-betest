import { Request, Response } from 'express';
import { loginUser, signUp } from '../middlewares/auth.middleware';

class AuthController {
    async login(req: Request, res: Response) {
        const { email, password, ip } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!ip) {
            return res.status(400).json({ message: 'Need ip' });
        }

        const responsee = await loginUser(email, password, ip);

        return res.status(200).json({ ...responsee });
    }

    async signUp(req: Request, res: Response) {
      const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Data tidak lengkap' });
        }

        const responsee = await signUp(email, password, name);

        return res.status(200).json({ ...responsee });
    }
}

export default AuthController;
