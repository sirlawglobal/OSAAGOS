const express = require('express');
const { createGroup, joinGroup, getGroups,leaveGroup,createGroupPost,getGroupPosts,updateGroupPost,deleteGroupPost, createReply, getReplies,updateReply,deleteReply} = require('../controller/groupController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createGroup);
router.post('/join/:groupId', protect, joinGroup);
router.post('/leave/:groupId', protect, leaveGroup);
router.get('/', protect, getGroups);
router.post('/:groupId/posts', protect, createGroupPost);
router.get('/:groupId/posts', protect, getGroupPosts);
router.put('/posts/:postId', protect, updateGroupPost);
router.delete('/posts/:postId', protect, deleteGroupPost);

router.post('/posts/:postId/replies', protect, createReply);
router.get('/posts/:postId/replies', protect, getReplies);
router.put('/replies/:replyId',protect, updateReply);
router.delete('/replies/:replyId', protect, deleteReply);

module.exports = router;



