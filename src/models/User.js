const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Alumni', 'Guest'],
        default: 'Alumni'
    },
    profilePicture: {
        type: String
    },
    education: {
        type: String
    },
    profession: {
        type: String
    },
    graduationYear: {
        type: String
    },
    fieldOfStudy: {
        type: String
    },
    address: {
        type: String
    },
    company: {
        type: String
    },
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.index({ name: 1, graduationYear: 1, fieldOfStudy: 1 }); // Adding indexes for search fields


UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
