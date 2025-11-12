"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("../models/customer.model"));
class CustomerService {
    async addCustomer(customerData) {
        return await customer_model_1.default.create(customerData);
    }
    async findCustomer(id) {
        return await customer_model_1.default.findByPk(id);
    }
    /**
     *
     * @param email
     * @returns
     */
    static async findByEmail(email) {
        return await customer_model_1.default.findOne({
            where: {
                email, status: {
                    [sequelize_1.Op.in]: ['pending', 'active']
                }
            }
        });
    }
    async modifyCustomer(id, updatedData) {
        const customer = await customer_model_1.default.findByPk(id);
        if (!customer) {
            return null;
        }
        return customer.update(updatedData);
    }
    async removeCustomer(id) {
        const deletedCount = await customer_model_1.default.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
exports.CustomerService = CustomerService;
exports.default = CustomerService;
