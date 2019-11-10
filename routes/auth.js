const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const router = express.Router();
const { signupValidationRules, validator } = require('../helpers/validators');

router.post('/signup', signupValidationRules(), validator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param('userId', userById);

module.exports = router;