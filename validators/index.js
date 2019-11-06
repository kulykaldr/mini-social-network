const { check, validationResult } = require('express-validator');

exports.postValidationRules = () => {
    return [
        check('title').not().isEmpty().withMessage('Write a title').bail()
            .isLength({ min: 4, max: 150 }).withMessage('Title must be between 4 to 150 characters'),
        check('body').not().isEmpty().withMessage('Write a body')
            .isLength({ min: 4, max: 2000 }).withMessage('Body must be between 4 to 2000 characters')
    ]
};

exports.createPostValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    })
};