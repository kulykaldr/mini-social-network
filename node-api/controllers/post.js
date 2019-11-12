const Post = require('../models/post');
const formidable = require("formidable");
const fs = require('fs');

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate('postedBy', '_id name')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                })
            }

            req.post = post;
            next();
        })
};

exports.getPosts = (req, res) => {
    Post.find()
        .populate('postedBy', '_id name')
        .select('_id title body')
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => console.log(error))
};

exports.createPost = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            return res.json(result);
        })
    });
};

exports.postedByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate('postedBy', '_id name')
        .sort('created')
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            return res.json(posts);
        })
};

exports.isPoster = (req, res, next) => {
    const isPoster = req.post && req.auth && String(req.post.postedBy._id) === req.auth._id;
    if (!isPoster) {
        return res.status(403).json({
            error: 'User have not permission for this action'
        })
    }

    next();
};

exports.deletePost = (req, res) => {
    const post = req.post;
    post.remove(err => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json({
            message: 'Post successfully deleted'
        })
    })
};

exports.updatePost = (req, res) => {
    const post = Object.assign(req.post, req.body);
    post.updated = Date.now();
    post.save((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.json(post);
    })
};