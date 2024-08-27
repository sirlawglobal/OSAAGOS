const Forum = require('../models/Forum');
const Post = require('../models/Post');

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
    const { forumId } = req.params;
    const { content } = req.body;
    const author = req.user.id;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        const post = new Post({ forum: forumId, author, content });
        await post.save();
        forum.posts.push(post._id);
        await forum.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    const { forumId } = req.params;

    try {
        const posts = await Post.find({ forum: forumId }).populate('author', 'name').sort({ timestamp: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    // const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const post = await Post.findById( req.params);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        // Update the post content
        post.content = content;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deletePost = async (req, res) => {
    // const { postId } = req.params;
    const userId = req.user.id;

    try {
        const post = await Post.findById(req.params);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Remove the post from the forum's posts array
        await Forum.updateOne(
            { _id: post.forum },
            { $pull: { posts: postId } }
        );

        // Delete the post
        await post.remove();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


