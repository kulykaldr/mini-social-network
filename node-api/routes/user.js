const express = require('express');
const {
    userById, allUsers, getUser, updateUser,
    deleteUser, addFollowing, addFollowers,
    removeFollowing, removeFollowers, userPhoto, findPeople
} = require('../controllers/user');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');

// foolow, unfollow routes
router.put('/users/follow', requireSignin, addFollowing, addFollowers);
router.put('/users/unfollow', requireSignin, removeFollowing, removeFollowers);

router.get('/users', allUsers);
router.get('/users/:userId', requireSignin, getUser);
router.put('/users/:userId', requireSignin, updateUser);
router.delete('/users/:userId', requireSignin, deleteUser);

// user photo route
router.get('/users/photo/:userId', userPhoto);

// who to follow
router.get('/users/findpeople/:userId', requireSignin, findPeople);

// any route containing :userId app will first execute userById()
router.param('userId', userById);

module.exports = router;