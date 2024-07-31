// routes/analyticsRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getAnalytics } = require('../controller/analyticsController');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.get('/analytics', getAnalytics);

module.exports = router;
