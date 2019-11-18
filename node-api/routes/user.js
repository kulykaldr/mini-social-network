const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser, userPhoto } = require('../controllers/user');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');

router.get('/users', allUsers);
router.get('/users/:userId', requireSignin, getUser);
router.put('/users/:userId', requireSignin, updateUser);
router.delete('/users/:userId', requireSignin, deleteUser);

// any route containing :userId app will first execute userById()
router.param('userId', userById);

module.exports = router;