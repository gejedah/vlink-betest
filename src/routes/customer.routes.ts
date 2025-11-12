import { Application } from 'express';
import CustomerController from '../controllers/customer.controller';
import { authenticate } from '../middlewares/auth.middleware';

const customerController = new CustomerController();

export const setCustomerRoutes = (app: Application) => {
    app.post('/customers', authenticate, customerController.createCustomer.bind(customerController));
    app.get('/customers/:id', authenticate, customerController.getCustomer.bind(customerController));
    app.put('/customers/:id', authenticate, customerController.updateCustomer.bind(customerController));
    app.delete('/customers/:id', authenticate, customerController.deleteCustomer.bind(customerController));
};

export default setCustomerRoutes;
