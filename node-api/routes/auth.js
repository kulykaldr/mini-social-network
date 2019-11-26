const express = require('express');
const { signup, signin, signout, forgotPassword, resetPassword } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const router = express.Router();
const { signupValidationRules, passwordResetValidationRules, validator } = require('../helpers/validators');

router.post('/auth/signup', signupValidationRules(), validator, signup);
router.post('/auth/signin', signin);
router.get('/auth/signout', signout);

// password forgot and reset routes
router.put("/auth/forgot-password", forgotPassword);
router.put("/auth/reset-password", passwordResetValidationRules, resetPassword);

// any route containing :userId app will first execute userById()
router.param('userId', userById);

module.exports = router;