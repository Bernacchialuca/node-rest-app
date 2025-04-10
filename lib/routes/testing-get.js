'use strict';
const router = require('express').Router();
const Joi = require('joi');
const validateQueryFields = require('../utils/middlewares/validate-query-fields');

function returnSomething(req, res) {
    return res.status(200).json(req.query.value);
}

router.get(
    '/helloworld',
    validateQueryFields(Joi.object({
        value: Joi.required()
    })),
    returnSomething
);

module.exports = router;
