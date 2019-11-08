const express = require('express');
const { userSignup } = require('../controllers/auth');
const router = express.Router();
const { authValidationRules, validator } = require('../helpers/validators');

router.post('/auth', authValidationRules(), validator, userSignup);

module.exports = router;