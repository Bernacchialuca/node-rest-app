'use strict';
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DB,
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        dialect: 'postgres',
        dialectOptions: {
            multipleStatements: true
        }
    },
    testing: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'postgres'
       }
};
