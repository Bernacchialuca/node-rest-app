'use strict';
const models = require('../../lib/models');
const {initialize} = require('../../app');
const logger = require('../../lib/logger');

function initDb() {
    return models.initializeDb()
        .then(() => {
            return initialize();
        })
        .catch((error) => {
            logger.error('APP STOPPED');
            logger.error(error.stack);
            return process.exit(1);
        });
}

function start() {
    return initialize();
}

module.exports = {
    start,
    initDb
};
