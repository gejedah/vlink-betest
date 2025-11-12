"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_service_1 = __importDefault(require("../services/customer.service"));
class CustomerController {
    constructor(customerService = new customer_service_1.default()) {
        this.customerService = customerService;
    }
    async createCustomer(req, res) {
        try {
            const customerData = req.body;
            const newCustomer = await this.customerService.addCustomer(customerData);
            res.status(201).json(newCustomer);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getCustomer(req, res) {
        try {
            const customerId = req.params.id;
            const customer = await this.customerService.findCustomer(customerId);
            if (customer) {
                res.status(200).json(customer);
            }
            else {
                res.status(404).json({ message: 'Customer not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateCustomer(req, res) {
        try {
            const customerId = req.params.id;
            const customerData = req.body;
            const updatedCustomer = await this.customerService.modifyCustomer(customerId, customerData);
            if (updatedCustomer) {
                res.status(200).json(updatedCustomer);
            }
            else {
                res.status(404).json({ message: 'Customer not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteCustomer(req, res) {
        try {
            const customerId = req.params.id;
            const result = await this.customerService.removeCustomer(customerId);
            if (result) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Customer not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = CustomerController;
