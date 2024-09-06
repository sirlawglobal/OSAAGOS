const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Forum_Post = mongoose.model('Forum_Post', postSchema);
module.exports = Forum_Post;
