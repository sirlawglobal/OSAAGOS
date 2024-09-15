const Group = require('../models/Group');
const Post = require('../models/Group_Post');

exports.createGroup = async (req, res) => {
    const { name, description } = req.body;
    const members = [req.user.id];

    try {
        const group = new Group({ name, description, members });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGroups = async (req, res) => {
    try {
        // const groups = await Group.find({ status: 'approved' });
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.joinGroup = async (req, res) => {
    // const { groupId } = req.params;
    const userId = req.user.id;
    // console.log("req", req);

    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is already a member
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'You are already a member of this group' });
        }

        // Check if user has already requested to join
        if (group.joinRequests.includes(userId)) {
            return res.status(400).json({ message: 'You have already requested to join this group' });
        }

        // Add user to joinRequests
        group.joinRequests.push(userId);
        await group.save();

        res.status(200).json({ message: 'Join request sent', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.leaveGroup = async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is a member of the group
        const isMember = group.members.includes(userId);
        if (!isMember) {
            return res.status(400).json({ message: 'You are not a member of this group' });
        }

        // Remove user from the members array
        group.members = group.members.filter(member => member.toString() !== userId.toString());
        await group.save();

        res.status(200).json({ message: 'You have left the group', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGroupPost = async (req, res) => {
    const { content } = req.body;
    const groupId = req.params.groupId;
    const author = req.user.id;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const post = new Post({ author, content, group: groupId });
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGroupPosts= async (req, res) => {
    const groupId = req.params.groupId;
//  console.log("req.par", req.params.groupId)

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const posts = await Post.find({ group: groupId }).populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGroupPost = async (req, res) => {
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

exports.deleteGroupPost = async (req, res) => {
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

        await post.deleteOne(); // Use deleteOne instead of remove
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// controllers/groupReplyController.js

// const Group_Post = require('../models/Group_Post');
const GroupReply = require('../models/GroupReply');

exports.createReply = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.postId;
    const author = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const reply = new GroupReply({
            author,
            content,
            post: postId
        });
        await reply.save();

        // Add the reply to the post's replies array
        post.replies.push(reply._id);
        await post.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReplies = async (req, res) => {
    const postId = req.params.postId;

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
        const reply = await GroupReply.findById(replyId);
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
        const reply = await GroupReply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        // Check if the logged-in user is the author of the reply
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



