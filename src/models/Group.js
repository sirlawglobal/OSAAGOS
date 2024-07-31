const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
