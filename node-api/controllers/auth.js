const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { sendEmail } = require('../helpers/sendEmail');

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

exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ error: 'No request body' });
    if (!req.body.email)
        return res.status(400).json({ error: 'No Email in request body' });

    console.log('forgot password finding user with that email');
    const { email } = req.body;
    console.log('signin req.body', email);
    // find the user based on email
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status(401).json({
                error: 'User with that email does not exist!'
            });

        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id, iss: 'NODEAPI' },
            process.env.JWT_SECRET
        );

        // email data
        const emailData = {
            from: 'noreply@node-react.com',
            to: email,
            subject: 'Password Reset Instructions',
            text: `Please use the following link to reset your password: ${
                process.env.CLIENT_URL
            }/reset-password/${token}`,
            html: `<p>Please use the following link to reset your password:</p> <p>${
                process.env.CLIENT_URL
            }/reset-password/${token}</p>`
        };

        return user.updateOne({ resetPasswordLink: token }, err => {
            if (err) {
                return res.json({ error: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
                });
            }
        });
    });
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status(401).json({
                error: 'Invalid Link!'
            });

        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
        };

        user = Object.assign(user, updatedFields);
        user.updated = Date.now();

        user.save(err => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! Now you can login with your new password.`
            });
        });
    });
};