'use strict';
require('dotenv').config();
const path = require('path');

const dialect = process.env.DB_DIALECT || 'sqlite';

function sqliteConfig(storage) {
  return {
    dialect: 'sqlite',
    storage,
    logging: false,
  };
}

module.exports = {
  development: dialect === 'sqlite'
    ? sqliteConfig(process.env.DB_STORAGE || path.resolve(__dirname, '..', 'database.sqlite'))
    : {
        username: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'customer_db',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        dialect,
        logging: false,
      },

  test: dialect === 'sqlite'
    ? sqliteConfig(process.env.DB_TEST_STORAGE || ':memory:')
    : {
        username: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'customer_db_test',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        dialect,
        logging: false,
      },

  production: process.env.DATABASE_URL
    ? { use_env_variable: 'DATABASE_URL', dialect }
    : (dialect === 'sqlite'
        ? sqliteConfig(process.env.DB_STORAGE || path.resolve(__dirname, '..', 'database.sqlite'))
        : {
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            dialect,
          }),
};
