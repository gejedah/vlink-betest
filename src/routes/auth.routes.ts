import { Application } from 'express';
import AuthController from '../controllers/auth.controller';

const authController = new AuthController();

export const setAuthRoutes = (app: Application) => {
    app.post('/auth/login', authController.login.bind(authController));
};

export default setAuthRoutes;
