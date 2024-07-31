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
        const forums = await Forum.find().populate('createdBy', 'name');
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
