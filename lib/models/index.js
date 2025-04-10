'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const CONN_INTERVAL = parseInt(process.env.POSTGRESQL_CONNECTION_INTERVAL);
const CONN_MAX_ATTEMPTS = parseInt(process.env.POSTGRESQL_CONNECTION_MAX_ATTEMPTS) || 5;

const sequelize = new Sequelize({
    database: process.env.POSTGRESQL_DB,
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    omitNull: true,
    dialect: 'postgres',
    logging: false
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(async(file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

function waitInterval(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

async function connectToPostgres() {
    let attempt = 0;
    let connectionOk = false;
    let err;
    while (!connectionOk && attempt < CONN_MAX_ATTEMPTS) {
        attempt++;
        try {
            await sequelize.authenticate();
            connectionOk = true;
        } catch (error) {
            err = error;
            await waitInterval(CONN_INTERVAL);
        }
    }
    if (!connectionOk) {
        throw new Error(err);
    }
}

function initializeDb() {
    return connectToPostgres()
        .then(() => {
            if (process.env.NODE_ENV === 'testing') {
                return sequelize.sync({force: true});
            }
            return Promise.resolve();
        })
        .then(() => {
            Object.keys(db).forEach((modelName) => {
                if (db[modelName].associate) {
                    db[modelName].associate(db);
                }
            });
        })
        .catch((err) => {
            throw new Error(err.message);
        });
}

db.connection = sequelize;
db.initializeDb = initializeDb;

module.exports = db;
