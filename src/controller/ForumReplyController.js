// // controllers/replyController.js

// const Post = require('../models/Forum_Post');
// const Reply = require('../models/Reply');

// exports.createReply = async (req, res) => {
//     const { content } = req.body;
//     const postId = req.params.postId;
//     const author = req.user.id;

//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         const reply = new Reply({
//             author,
//             content,
//             post: postId
//         });
//         await reply.save();

//         // Push the reply to the post's replies array
//         post.replies.push(reply._id);
//         await post.save();

//         res.status(201).json(reply);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getReplies = async (req, res) => {
//     const postId = req.params.postId;

//     try {
//         const post = await Post.findById(postId).populate({
//             path: 'replies',
//             populate: {
//                 path: 'author',
//                 select: 'name'
//             }
//         });
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.json(post.replies);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateReply = async (req, res) => {
//     const replyId = req.params.replyId;
//     const { content } = req.body;
//     const userId = req.user.id;

//     try {
//         const reply = await Reply.findById(replyId);
//         if (!reply) {
//             return res.status(404).json({ message: 'Reply not found' });
//         }

//         if (reply.author.toString() !== userId.toString()) {
//             return res.status(403).json({ message: 'You are not authorized to update this reply' });
//         }

//         reply.content = content;
//         await reply.save();

//         res.json(reply);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteReply = async (req, res) => {
//     const replyId = req.params.replyId;
//     const userId = req.user.id;

//     try {
//         const reply = await Reply.findById(replyId);
//         if (!reply) {
//             return res.status(404).json({ message: 'Reply not found' });
//         }

//         if (reply.author.toString() !== userId.toString()) {
//             return res.status(403).json({ message: 'You are not authorized to delete this reply' });
//         }

//         await reply.remove();

//         // Remove the reply from the post's replies array
//         await Post.updateMany(
//             { replies: replyId },
//             { $pull: { replies: replyId } }
//         );

//         res.json({ message: 'Reply deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
