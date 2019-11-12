const User = require('../models/user');

// Middleware to take user profile by userId
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: 'User don\'t find'
            })
        }
        req.profile = user;
        next();
    })
};

exports.hasAuthorization = (req, res) => {
    const authorized = req.profile && req.auth || req.profile._id && req.auth._id;
    if (!authorized) {
        return res.status(403).json({
            error: 'User is not authorized to perform this action'
        })
    }
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.json({ users })
    }).select('name email created updated')
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    let user = Object.assign(req.profile, req.body);
    user.updated = Date.now();
    user.save(err => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action'
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        return res.json(user)
    });
};

exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        return res.status(410).json({
            message: 'Delete user success'
        })
    })
};