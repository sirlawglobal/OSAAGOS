const express = require('express');
const { createGroup, joinGroup, getGroups,leaveGroup,createGroupPost,getGroupPosts,updateGroupPost,deleteGroupPost } = require('../controller/groupController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createGroup);
router.post('/join/:groupId', protect, joinGroup);
router.post('/leave/:groupId', protect, leaveGroup);
router.get('/', protect, getGroups);
router.post('posts/:forumId/posts', protect, createGroupPost);
router.get('posts/:forumId/posts', protect, getGroupPosts);
router.put('/posts/:postId', protect, updateGroupPost);
router.delete('/posts/:postId', protect, deleteGroupPost);

module.exports = router;
