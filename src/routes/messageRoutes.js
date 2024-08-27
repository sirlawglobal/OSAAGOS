const express = require('express');
const { sendMessage, getMessages } = require('../controller/messageController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/', protect, getMessages);

module.exports = router;
