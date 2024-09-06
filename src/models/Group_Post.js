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
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Group_Post = mongoose.model('Group_Post', postSchema);
module.exports = Group_Post;
