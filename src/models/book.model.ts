import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

export interface BookAttributes {
    id: string;
    title: string;
    author: string;
    publishedYear?: number | null;
    stock: number;
    price: number;
}

export type BookCreationAttributes = Optional<BookAttributes, 'id'>;

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public id!: string;
    public title!: string;
    public author!: string;
    public publishedYear?: number | null;
    public stock!: number;
    public price!: number;
}

Book.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        publishedYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1800,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 1000,
            },
        }
    },
    {
        sequelize,
        modelName: 'Book',
        tableName: 'books',
        timestamps: true,
        underscored: true,
    }
);

export default Book;
