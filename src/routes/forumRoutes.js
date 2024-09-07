const express = require('express');
const { createForum, getForums, createPost, getPosts, updatePost, deletePost,createReply,getReplies,updateReply,deleteReply} = require('../controller/forumController');
const { protect } = require('../middleware/authMiddleware');

// const replyController = require('../controller/ForumReplyController');

const router = express.Router();

router.post('/create', protect, createForum);
router.get('/', protect, getForums);

router.post('/:forumId/post', protect, createPost);
router.get('/:forumId/posts', protect, getPosts);

router.put('/posts/:postId', protect, updatePost);
router.delete('/posts/:postId', protect, deletePost);

router.post('/posts/:postId/replies',protect, createReply);
router.get('/posts/:postId/replies',protect,  getReplies);
router.put('/posts/replies/:replyId',protect,  updateReply);
router.delete('/posts/replies/:replyId', protect, deleteReply);


module.exports = router;