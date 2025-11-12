"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const dialect = (process.env.DB_DIALECT || 'sqlite');
const logging = process.env.NODE_ENV === 'development' ? console.log : false;
let sequelize;
if (process.env.DATABASE_URL) {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect,
        logging,
    });
}
else {
    sequelize = new sequelize_1.Sequelize(config_1.default.db.database, config_1.default.db.user, config_1.default.db.password, {
        host: config_1.default.db.host,
        port: Number(config_1.default.db.port),
        dialect,
        logging,
    });
}
exports.default = sequelize;
