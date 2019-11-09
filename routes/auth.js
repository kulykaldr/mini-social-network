const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const router = express.Router();
const { signupValidationRules, validator } = require('../helpers/validators');

router.post('/signup', signupValidationRules(), validator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;