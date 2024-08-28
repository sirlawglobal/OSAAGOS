const express = require('express');
const { createForum, getForums, createPost, getPosts, updatePost, deletePost} = require('../controller/forumController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createForum);
router.get('/', protect, getForums);

router.post('/:forumId/post', protect, createPost);
router.get('/:forumId/posts', protect, getPosts);

router.put('/posts/:postId', protect, updatePost);
router.delete('/posts/:postId', protect, deletePost);

module.exports = router;