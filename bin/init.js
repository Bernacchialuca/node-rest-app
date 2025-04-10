'use strict';
require('dotenv').config();
const {initialize} = require('../app');
const logger = require('../lib/logger');
const scheduleRunner = require('../lib/utils/schedule-runner');
const {initializeDb} = require('../lib/models');
let application;

return initializeDb()
    .then(() => {
        application = initialize();
        scheduleRunner();
        application.listen(process.env.SERVER_PORT);
        logger.info(`Your server is listening on port ${process.env.SERVER_PORT}`);
    })
    .catch((error) => {
        logger.error('APP STOPPED');
        logger.error(error.message);
        logger.error(error.stack);
        return process.exit(1);
    });
