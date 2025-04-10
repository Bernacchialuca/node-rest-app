'use strict';
function validateQueryFields(validationSchema) {
    return (req, res, next) => {
        const {error} = validationSchema.validate(req.query);
        if (error) {
            const firstError = error.details[0].message;
            return res.status(400).json({
                code: 'invalid_fields',
                message: `Invalid field - ${firstError}`
            });
        }
        return next();
    };
}

module.exports = validateQueryFields;
