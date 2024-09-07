// routes/replyRoutes.js

const express = require('express');
const router = express.Router();
const replyController = require('../controller/replyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/posts/:postId/replies', protect,replyController.createReply);
router.get('/posts/:postId/replies', protect,replyController.getReplies);
router.put('/replies/:replyId',protect, replyController.updateReply);
router.delete('/replies/:replyId', protect,replyController.deleteReply);

module.exports = router;
