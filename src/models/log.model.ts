import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

export interface LogAttributes {
    id: string;
    userId?: string | null;
    actionInfo: string;
    ip?: string | null;
    meta?: object | null;
    level?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export type LogCreationAttributes = Optional<LogAttributes, 'id' | 'userId' | 'ip' | 'meta' | 'level' | 'createdAt' | 'updatedAt'>;

class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
    public id!: string;
    public userId?: string | null;
    public actionInfo!: string;
    public ip?: string | null;
    public meta?: object | null;
    public level?: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Log.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'user_id',
        },
        actionInfo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ip: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        meta: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        level: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'info',
        }
    },
    {
        sequelize,
        modelName: 'Log',
        tableName: 'logs',
        timestamps: true,
        underscored: true,
    }
);

export default Log;
