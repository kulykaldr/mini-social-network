const Post = require('../models/post');

exports.getPosts = (req, res) => {
    Post.find()
        .select('_id title body')
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => console.log(error))
};

exports.createPost = async (req, res) => {
    const post = new Post(req.body);
    post.save((error, result) => {
        if (error) {
            return res.status(400).json({ error })
        }
        res.status(200).json({
            post: result
        })
    });
};
