const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        minLength: 4,
        maxLength: 150
    },
    body: {
        type: String,
        required: 'Body is required',
        minLength: 4,
        maxLength: 2000
    },
    thumbnail: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: 'User' }
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);