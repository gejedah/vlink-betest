import { Dialect, Sequelize } from 'sequelize';
import config from '../config';

const dialect = ((process.env.DB_DIALECT as Dialect) || 'sqlite') as Dialect;
const logging = process.env.NODE_ENV === 'development' ? console.log : false;

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect,
        logging,
    });
} else {
    sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
        host: config.db.host,
        port: Number(config.db.port),
        dialect,
        logging,
    });
}

export default sequelize;
