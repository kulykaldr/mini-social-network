const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            error: 'Email is already use in system'
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
                error: 'User with this email does not exist'
            })
        }

        // if password from user correct - then auth user
        if (!user.isPasswordCorrect(password)) {
            return res.status(401).json({
                error: 'Email and password don\'t match'
            })
        }
        // generate token with user id adn jwt secret
        const token = jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET);

        // set cookie with jwt token - will expire in 60 min
        res.cookie('t', token, { maxAge: 1000 * 60 * 60 });

        // send response to user with user data (id, email, name) and token
        const { _id, name, email } = user;

        return res.json({ token, user: { _id, name, email } })
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success' });
};