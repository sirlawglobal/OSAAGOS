// models/GroupReply.js

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
        ref: 'Group_Post',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const GroupReply = mongoose.model('GroupReply', replySchema);
module.exports = GroupReply;
