const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();
const { postValidationRules, validator } = require('../helpers/validators');

router.get('/posts', requireSignin, getPosts);
router.post('/posts', postValidationRules(), validator, createPost);

module.exports = router;