'use strict';
const request = require('../mocks/request');
const app = require('../mocks/app');

describe('GET /helloworld', () => {
    let application;
    before(() => {
        application = app.start();
    });

    it('should return hello world', () => {
        return request(application)
            .get('/api/helloworld')
            .set('Accept', 'application/json')
            .query({
                value: 'hello world!'
            })
            .expect(200)
            .then((response) => {
                response.body.should.containDeep('hello world!');
            });
    });

    it('should return 400 if value is not present', () => {
        return request(application)
            .get('/api/helloworld')
            .set('Accept', 'application/json')
            .expect(400)
            .then((response) => {
                response.body.should.containDeep({
                    code: 'invalid_fields',
                    message: 'Invalid field - "value" is required'
                });
            });
    });

});
