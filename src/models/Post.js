const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
