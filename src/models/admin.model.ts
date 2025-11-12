import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

export interface AdminAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string; // e.g. 'user', 'admin'
    status: string; // e.g. 'active', 'inactive'
    isVerified: boolean;
    lastLogin?: Date | null;
}

export type UserCreationAttributes = Optional<AdminAttributes, 'id' | 'role' | 'status' | 'isVerified' | 'lastLogin'>;

class User extends Model<AdminAttributes, UserCreationAttributes> implements AdminAttributes {
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public status!: string;
    public isVerified!: boolean;
    public lastLogin?: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'user',
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'active',
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

export default User;
