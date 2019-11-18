const User = require('../models/user');
const formidable = require("formidable");
const fs = require('fs');

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

        return res.json(users);
    }).select('name email created updated photo about')
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                errors: [{
                    photo: 'Image could not be uploaded'
                }]
            })
        }
        let user = req.profile;
        user = Object.assign(user, fields);
        user.updated = Date.now();

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save(err => {
            if (err) {
                return res.status(400).json(err)
            }

            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        })
    })
};

exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove(err => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(410).json({
            message: 'Delete user success'
        })
    })
};