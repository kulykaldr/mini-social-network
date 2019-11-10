const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();
const { postValidationRules, validator } = require('../helpers/validators');
import { userById } from "../controllers/user";

router.get('/posts', requireSignin, getPosts);
router.post('/posts', postValidationRules(), validator, createPost);

router.param('userId', userById);

module.exports = router;