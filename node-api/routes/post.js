const express = require('express');
const { getPosts, createPost, postedByUser, postById, isPoster ,deletePost, updatePost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();
const { postValidationRules, validator } = require('../helpers/validators');
const { userById } = require('../controllers/user');

router.get('/posts', getPosts);
router.get('/posts/by/:userId', requireSignin, postedByUser);
router.post('/posts/new/:userId', requireSignin, postValidationRules(), createPost,  validator);
router.put('/posts/:postId', requireSignin, isPoster, updatePost);
router.delete('/posts/:postId', requireSignin, isPoster, deletePost);

// any route containing :userId app will first execute userById()
router.param('userId', userById);
router.param('postId', postById);

module.exports = router;