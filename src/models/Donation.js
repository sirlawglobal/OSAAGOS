const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['USD', 'NGN'], // Ensure only 'USD' or 'NGN' can be used
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});



const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;