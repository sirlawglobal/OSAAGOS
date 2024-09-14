const Forum = require('../models/Forum');
const Post = require('../models/Forum_Post');
// const Post = require('../models/Forum_Post');
const Forum_Reply = require('../models/Forum_reply');

exports.createForum = async (req, res) => {
    const { title, description } = req.body;
    const createdBy = req.user.id;

    try {
        const forum = new Forum({ title, description, createdBy });
        await forum.save();
        res.status(201).json(forum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getForums = async (req, res) => {
    try {
        const forums = await Forum.find({ status: 'approved' }).populate('createdBy', 'name');
        res.json(forums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createPost = async (req, res) => {
    const { content } = req.body;
    const forumId = req.params.forumId;
    const author = req.user.id;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        const post = new Post({ author, content, forum: forumId });
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getPosts = async (req, res) => {
    const forumId = req.params.forumId;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        const posts = await Post.find({ forum: forumId }).populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        post.content = content;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await post.remove();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.createReply = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.postId;
    const author = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const reply = new Forum_Reply({
            author,
            content,
            post: postId
        });
        await reply.save();

        // Push the reply to the post's replies array
        post.replies.push(reply._id);
        await post.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReplies = async (req, res) => {
    const postId = req.params.postId;
// console.log("received",postId )
    try {
        const post = await Post.findById(postId).populate({
            path: 'replies',
            populate: {
                path: 'author',
                select: 'name'
            }
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post.replies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReply = async (req, res) => {
    const replyId = req.params.replyId;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const reply = await Forum_Reply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        if (reply.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this reply' });
        }

        reply.content = content;
        await reply.save();

        res.json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReply = async (req, res) => {
    const replyId = req.params.replyId;
    const userId = req.user.id;

    try {
        const reply = await Forum_Reply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        if (reply.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this reply' });
        }

        // Use deleteOne instead of remove
        await reply.deleteOne();

        // Remove the reply from the post's replies array
        await Post.updateMany(
            { replies: replyId },
            { $pull: { replies: replyId } }
        );

        res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


