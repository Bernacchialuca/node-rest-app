'use strict';
const supertest = require('supertest');

function hook(method, application) {
    return function(path) {
        return supertest(application)[method](path)
            .set('Accept', 'application/json')
            .set('X-Current-URL', 'http://testing-page.com/fakepath');
    };
}

function request(application) {
    return {
        get: hook('get', application),
        post: hook('post', application),
        put: hook('put', application),
        delete: hook('delete', application),
        patch: hook('patch', application)
    };
}

module.exports = request;
