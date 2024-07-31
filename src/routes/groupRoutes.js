const express = require('express');
const { createGroup, joinGroup, getGroups } = require('../controller/groupController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createGroup);
router.post('/join/:groupId', protect, joinGroup);
router.get('/', protect, getGroups);

module.exports = router;
