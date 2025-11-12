import { Op } from 'sequelize';
import Customer, { CustomerAttributes, CustomerCreationAttributes } from '../models/customer.model';

export class CustomerService {
    async addCustomer(customerData: CustomerCreationAttributes) {
        return await Customer.create(customerData);
    }

    async findCustomer(id: string) {
        return await Customer.findByPk(id);
    }

    /**
     * 
     * @param email 
     * @returns 
     */
    static async findByEmail(email: string) {
        return await Customer.findOne({
            where: {
                email, status: {
                    [Op.in]: ['pending', 'active']
                }
            }
        });
    }

    async modifyCustomer(id: string, updatedData: Partial<CustomerAttributes>) {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return null;
        }
        return customer.update(updatedData);
    }

    async removeCustomer(id: string) {
        const deletedCount = await Customer.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export default CustomerService;
