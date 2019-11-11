const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();
const { postValidationRules, validator } = require('../helpers/validators');
const { userById } = require('../controllers/user');

router.get('/posts', getPosts);
router.post('/posts', requireSignin, postValidationRules(), validator, createPost);

// any route containing :userId app will first execute userById()
router.param('userId', userById);

module.exports = router;