import { Request, Response } from 'express';
import CartService from '../services/cart.service';

class CartController {
  constructor(private cartService = new CartService()) {}

  async createCart(req: Request, res: Response) {
    try {
      const cartData = req.body;
      const newCart = await this.cartService.addCart(cartData);
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const cartId = req.params.id;
      const cart = await this.cartService.findCart(cartId);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async listCarts(_req: Request, res: Response) {
    try {
      const carts = await this.cartService.listCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const cartId = req.params.id;
      const cartData = req.body;
      const updatedCart = await this.cartService.modifyCart(cartId, cartData);
      if (updatedCart) {
        res.status(200).json(updatedCart);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const cartId = req.params.id;
      const result = await this.cartService.removeCart(cartId);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default CartController;
