const express = require('express');
const { createForum, getForums, createPost, getPosts } = require('../controller/forumController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createForum);
router.get('/', protect, getForums);
router.post('/:forumId/post', protect, createPost);
router.get('/:forumId/posts', protect, getPosts);

module.exports = router;
