import Cart, { CartAttributes, CartCreationAttributes } from '../models/cart.model';

export class CartService {
  async addCart(cartData: CartCreationAttributes) {
    return Cart.create(cartData);
  }

  async findCart(id: string) {
    return Cart.findByPk(id);
  }

  async listCarts() {
    return Cart.findAll();
  }

  async modifyCart(id: string, updatedData: Partial<CartAttributes>) {
    const cart = await Cart.findByPk(id);
    if (!cart) return null;
    return cart.update(updatedData);
  }

  async removeCart(id: string) {
    const deletedCount = await Cart.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

export default CartService;
