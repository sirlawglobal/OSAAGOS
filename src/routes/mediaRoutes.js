// routes/mediaRoutes.js
const express = require('express');

const { protect, authorize } = require('../middleware/authMiddleware');

const upload = require('../config/multerConfig');

const { uploadMedia, getAllMedia, getMediaById } = require('../controller/mediaController');

const router = express.Router();

router.post('/upload', protect, authorize('Admin', 'alumni'), upload.single('file'), uploadMedia);

router.get('/', getAllMedia);

router.get('/:id', getMediaById);

module.exports = router;
