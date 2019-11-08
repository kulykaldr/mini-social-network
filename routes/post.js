const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const router = express.Router();
const { postValidationRules, validator } = require('../helpers/validators');

router.get('/posts', getPosts);
router.post('/posts', postValidationRules(), validator, createPost);

module.exports = router;