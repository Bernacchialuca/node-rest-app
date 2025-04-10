'use strict';
const router = require('express').Router();
const Joi = require('joi');
const validateBodyFields = require('../utils/middlewares/validate-body-fields');

function validateAge(req, res, next) {
    const age = req.body.age;
    if(age >= 18) {
        return next();
    }
    return res.status(400).json({
        code: 'cannot_access_to_the_pub',
        message: 'Cannot acces to the pub'
    });
}

function canAccess(req, res) {
    return res.status(200).json({canAccess: true});
}

router.post(
    '/testingpost',
    validateBodyFields(Joi.object({
        age: Joi.number().integer().required()
    })),
    validateAge,
    canAccess
);

module.exports = router;
