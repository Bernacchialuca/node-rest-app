'use strict';
const path = require('path');
const envPath = path.join(__dirname, '/../../.env.test');
require('dotenv').config({path: envPath});
const mockery = require('mockery');
mockery.enable({warnOnUnregistered: false});
