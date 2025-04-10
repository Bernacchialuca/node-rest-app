'use strict';
const app = require('../mocks/app');
require('should');

describe('Database - connect', () => {
    before(function() {
        this.timeout(30000);
        return app.initDb();
    });

    it('should connect database', () => {
        true.should.be.equal(true);
    });
});
