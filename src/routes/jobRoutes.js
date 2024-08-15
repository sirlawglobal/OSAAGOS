// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobController');

const { protect, authorize } = require('../middleware/authMiddleware');
router.use(protect);
router.use(authorize('Admin'));

// Fetch all jobs
router.get('/', jobController.getAllJobs);

// Create a new job
router.post('/create', jobController.createJob);

// Update a job
router.put('/:id', jobController.updateJob);

// Delete a job
router.delete('/:id', jobController.deleteJob);

module.exports = router;
