// controllers/jobController.js
const Job = require('../models/Job');

// Fetch all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new job
exports.createJob = async (req, res) => {
    try {
        // Assuming the authenticated user ID is available in req.user.id
        const jobData = {
            ...req.body,
            postedBy: req.user.id
        };

        const newJob = new Job(jobData);
        const savedJob = await newJob.save();

        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// exports.createJob = async (req, res) => {
//     try {
//         const newJob = new Job(req.body);
//         const savedJob = await newJob.save();
//         res.status(201).json(savedJob);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };



// Update a job
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
