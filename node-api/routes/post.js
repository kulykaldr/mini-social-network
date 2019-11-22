const express = require('express');
const { getPosts, createPost, postedByUser,
    postById, isPoster ,deletePost,
    updatePost, singlePost, likePost, unlikePost,
    commentPost, uncommentPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();
const { postValidationRules, validator } = require('../helpers/validators');
const { userById } = require('../controllers/user');

router.get('/posts', getPosts);
// like unlike route
router.put('/posts/like', requireSignin, likePost);
router.put('/posts/unlike', requireSignin, unlikePost);

// comment
router.put('/posts/comment', requireSignin, commentPost);
router.put('/posts/uncomment', requireSignin, uncommentPost);

router.get('/posts/by/:userId', requireSignin, postedByUser);
router.post('/posts/new/:userId', requireSignin, postValidationRules(), createPost,  validator);
router.put('/posts/:postId', requireSignin, isPoster, updatePost);
router.get('/posts/:postId', singlePost);
router.delete('/posts/:postId', requireSignin, isPoster, deletePost);

// any route containing :userId app will first execute userById()
router.param('userId', userById);
router.param('postId', postById);

module.exports = router;