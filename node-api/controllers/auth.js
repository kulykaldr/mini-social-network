const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(401).json({
            errors: [{
                email: 'Email is already use in system'
            }]
        })
    }

    const user = await new User(req.body);
    user.save();
    return res.json({
        message: 'Signup success! Please login!'
    })
};

exports.signin = (req, res) => {

    const { email, password } = req.body;

    // find the user based on email
    User.findOne({ email }, (err, user) => {
        // if error or no user send error
        if (err || !user) {
            return res.status(401).json({
                errors: [{
                    email: 'User with this email does not exist'
                }]
            })
        }

        // if password from user correct - then auth user
        if (!user.isPasswordCorrect(password)) {
            return res.status(401).json({
                errors: [{
                    email: 'Email and password don\'t match',
                    password: 'Email and password don\'t match'
                }]
            })
        }
        // generate token with user id adn jwt secret
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

        // set cookie with jwt token - will expire in 60 min
        res.cookie('t', token, { maxAge: 1000 * 60 * 60 });

        // send response to user with user data (id, email, name) and token
        const { _id, name, email, created } = user;

        return res.json({ token, user: { _id, name, email, created } })
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    // If the token is valid, express jwt appends the verified userid
    // in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});