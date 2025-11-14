import { Request, Response } from 'express';
import AdminService from '../services/admin.service';

class AdminController {
    constructor(private adminService = new AdminService()) {}

    async createAdmin(req: Request, res: Response) {
        try {
            const adminData = req.body;
            const newAdmin = await AdminService.addAdmin(adminData);
            res.status(201).json(newAdmin);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getAdmin(req: Request, res: Response) {
        try {
            const adminId = req.params.id;
            const admin = await this.adminService.findAdmin(adminId);
            if (admin) {
                res.status(200).json(admin);
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateAdmin(req: Request, res: Response) {
        try {
            const adminId = req.params.id;
            const adminData = req.body;
            const updatedAdmin = await this.adminService.modifyAdmin(adminId, adminData);
            if (updatedAdmin) {
                res.status(200).json(updatedAdmin);
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const adminId = req.params.id;
            const result = await this.adminService.removeAdmin(adminId);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default AdminController;
