"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
class Cart extends sequelize_1.Model {
}
Cart.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    items: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
    status: {
        type: sequelize_1.DataTypes.STRING(55),
        allowNull: false,
        defaultValue: 'open',
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
    underscored: true,
});
exports.default = Cart;
