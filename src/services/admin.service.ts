import { Op } from 'sequelize';
import Admin, { AdminAttributes, UserCreationAttributes } from '../models/admin.model';

export class AdminService {
    static async addAdmin(adminData: UserCreationAttributes) {
        return await Admin.create(adminData);
    }

    async findAdmin(id: string) {
        return await Admin.findByPk(id);
    }

    static async findByEmail(email: string) {
        return await Admin.findOne({
            where: {
                email,
                status: {
                    [Op.in]: ['active']
                }
            }
        });
    }

    async modifyAdmin(id: string, updatedData: Partial<AdminAttributes>) {
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return null;
        }
        return admin.update(updatedData);
    }

    async removeAdmin(id: string) {
        const deletedCount = await Admin.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export default AdminService;
