'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let routes = {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file !== 'index.js'
        );
    })
    .forEach((file) => {
        const keyName = file.slice(0, -3);
        routes[keyName] = require(path.join(__dirname, file));
    });

module.exports = routes;
