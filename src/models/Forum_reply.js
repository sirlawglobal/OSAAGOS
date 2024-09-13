// models/Reply.js

const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum_Post',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Forum_reply = mongoose.model('Forum_reply', replySchema);
module.exports = Forum_reply ;
