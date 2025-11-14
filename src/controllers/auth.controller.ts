import { Request, Response } from 'express';
import { loginUser, signUp } from '../middlewares/auth.middleware';

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password, deviceId } = req.body;

            if (!email || !password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (!deviceId) {
                return res.status(400).json({ message: 'Need device_id' });
            }

            const responsee = await loginUser(email, password, deviceId);

            return res.status(200).json({ ...responsee });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message || 'Internal server error' });
        }
    }

    async signUp(req: Request, res: Response) {
        try {
            const { email, password, name, kode } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Data tidak lengkap' });
            }

            const responsee: any = await signUp(email, password, name, kode);

            delete responsee.dataValues?.password;

            return res.status(200).json({ ...responsee.dataValues });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message || 'Internal server error' });
        }
    }
}

export default AuthController;
