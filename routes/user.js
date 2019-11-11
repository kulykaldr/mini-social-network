const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);

// any route containing :userId app will first execute userById()
router.param('userId', userById);

module.exports = router;