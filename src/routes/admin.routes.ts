import { Application } from 'express';
import AdminController from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';

const adminController = new AdminController();

export const setAdminRoutes = (app: Application) => {
    app.post('/admins', authenticate, adminController.createAdmin.bind(adminController));
    app.get('/admins/:id', authenticate, adminController.getAdmin.bind(adminController));
    app.put('/admins/:id', authenticate, adminController.updateAdmin.bind(adminController));
    app.delete('/admins/:id', authenticate, adminController.deleteAdmin.bind(adminController));
};

export default setAdminRoutes;
