'use strict';
const request = require('../mocks/request');
const app = require('../mocks/app');

describe('POST /testingpost', () => {
    let application;
    before(() => {
        application = app.start();
    });

    it('should return 200 if user can access to the pub', () => {
        return request(application)
            .post('/api/testingpost')
            .set('Accept', 'application/json')
            .send({
                age: 20
            })
            .expect(200)
            .then((response) => {
                response.body.should.containDeep({
                    canAccess: true
                });
            });
    });

    it('should return 400 if age is not present on body', () => {
        return request(application)
            .post('/api/testingpost')
            .set('Accept', 'application/json')
            .expect(400)
            .then((response) => {
                response.body.should.containDeep({
                    code: 'invalid_fields',
                    message: 'Invalid field - "age" is required'
                });
            });
    });

    it('should return 400 if user has less than 18', () => {
        return request(application)
            .post('/api/testingpost')
            .set('Accept', 'application/json')
            .send({
                age: 16
            })
            .expect(400)
            .then((response) => {
                response.body.should.containDeep({
                    code: 'cannot_access_to_the_pub',
                    message: 'Cannot acces to the pub'
                });
            });
    });

});
