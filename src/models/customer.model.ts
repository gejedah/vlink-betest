import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

export interface CustomerAttributes {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    status: string; // e.g., 'active', 'inactive'
}

export type CustomerCreationAttributes = Optional<CustomerAttributes, 'id'>;

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public phone?: string | null;
    public status!: string;
}

Customer.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                is: /^\+?[0-9]{10,14}$/,
            },
        },
        status: {
            type: DataTypes.STRING(55),
            allowNull: false,
            defaultValue: 'pending',
        },
    },
    {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

export default Customer;
