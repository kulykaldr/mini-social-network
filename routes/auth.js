const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const router = express.Router();
const { signupValidationRules, validator } = require('../helpers/validators');

router.post('/auth/signup', signupValidationRules(), validator, signup);
router.post('/auth/signin', signin);
router.get('/auth/signout', signout);

// any route containing :userId app will first execute userById()
router.param('userId', userById);

module.exports = router;