import { Application } from 'express';
import CartController from '../controllers/cart.controller';
import { authenticate } from '../middlewares/auth.middleware';

const cartController = new CartController();

export const setCartRoutes = (app: Application) => {
  app.post('/carts', authenticate, cartController.createCart.bind(cartController));
  app.get('/carts', authenticate, cartController.listCarts.bind(cartController));
  app.get('/carts/:id', authenticate, cartController.getCart.bind(cartController));
  app.put('/carts/:id', authenticate, cartController.updateCart.bind(cartController));
  app.delete('/carts/:id', authenticate, cartController.deleteCart.bind(cartController));
};

export default setCartRoutes;
