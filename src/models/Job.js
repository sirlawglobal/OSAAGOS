// models/Job.js
const mongoose = require('mongoose');

const jobSchema =  mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: { type: String },
    employmentType: { 
        type: String, 
        enum: ['full-time', 'part-time', 'contract'], 
        required: true 
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postedDate: { type: Date, default: Date.now },
    applicationDeadline: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

// module.exports = mongoose.model('Job', jobSchema);
