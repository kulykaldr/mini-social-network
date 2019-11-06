const express = require('express');
const postController = require('../controllers/post');
const router = express.Router();
const validator = require('../validators');

router.get('/posts', postController.getPosts);
router.post('/posts', validator.postValidationRules(), validator.createPostValidator, postController.createPost);

module.exports = router;