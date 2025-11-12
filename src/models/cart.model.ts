import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartAttributes {
  id: string;
  customerId: string;
  items: CartItem[];
  status: string; // e.g., 'open', 'completed', 'cancelled'
  total?: number | null;
}

export type CartCreationAttributes = Optional<CartAttributes, 'id' | 'status' | 'total'>;

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: string;
  public customerId!: string;
  public items!: CartItem[];
  public status!: string;
  public total?: number | null;
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    status: {
      type: DataTypes.STRING(55),
      allowNull: false,
      defaultValue: 'open',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
    underscored: true,
  }
);

export default Cart;
