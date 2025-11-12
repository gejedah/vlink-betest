import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';

class CustomerController {
    constructor(private customerService = new CustomerService()) {}

    async createCustomer(req: Request, res: Response) {
        try {
            const customerData = req.body;
            const newCustomer = await this.customerService.addCustomer(customerData);
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getCustomer(req: Request, res: Response) {
        try {
            const customerId = req.params.id;
            const customer = await this.customerService.findCustomer(customerId);
            if (customer) {
                res.status(200).json(customer);
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            const customerId = req.params.id;
            const customerData = req.body;
            const updatedCustomer = await this.customerService.modifyCustomer(customerId, customerData);
            if (updatedCustomer) {
                res.status(200).json(updatedCustomer);
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        try {
            const customerId = req.params.id;
            const result = await this.customerService.removeCustomer(customerId);
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Customer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default CustomerController;
