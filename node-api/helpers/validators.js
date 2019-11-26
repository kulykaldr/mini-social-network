const { check, validationResult } = require('express-validator');

exports.postValidationRules = () => {
    return [
        check('title').not().isEmpty().withMessage('Write a title').bail()
            .isLength({ min: 4, max: 150 }).withMessage('Title must be between 4 to 150 characters'),
        check('body').not().isEmpty().withMessage('Write a body')
            .isLength({ min: 4, max: 2000 }).withMessage('Body must be between 4 to 2000 characters')
    ]
};

exports.signupValidationRules = () => {
    return [
        check('name').not().isEmpty().withMessage('The name must not be empty')
            .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 to 50 characters'),
        check('email').isEmail().normalizeEmail().withMessage('Type valid email'),
        check('password').not().isEmpty().withMessage('The password must not be empty')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
            .matches(/\d/).withMessage('Password must contain at least one number')
    ]
};

exports.passwordResetValidationRules = () => {
    // check for password
    return [
        check("newPassword", "Password is required").notEmpty(),
        check("newPassword")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars long")
            .matches(/\d/)
            .withMessage("must contain a number")
            .withMessage("Password must contain a number")
    ]
};

exports.validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};