"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
class Customer extends sequelize_1.Model {
}
Customer.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(55),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        validate: {
            is: /^\+?[0-9]{10,14}$/,
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING(55),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: true,
    underscored: true,
});
exports.default = Customer;
