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
        const groups = await Group.find({ status: 'approved' });
        // const groups = await Group.find();
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

        await post.remove();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// exports.createGroupPost = async (req, res) => {
//     const { forumId, content } = req.body;
//     const authorId = req.user.id;

//     try {
//         const newPost = new Post({
//             forum: forumId,
//             author: authorId,
//             content
//         });
//         await newPost.save();

//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.getGroupPosts = async (req, res) => {
//     const { forumId } = req.params;

//     try {
//         const posts = await Post.find({ forum: forumId }).populate('author', 'name email');
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.updateGroupPost = async (req, res) => {
//     const { postId } = req.params;
//     const { content } = req.body;
//     const authorId = req.user.id;

//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         // Ensure the current user is the author of the post
//         if (post.author.toString() !== authorId.toString()) {
//             return res.status(403).json({ message: 'You are not authorized to update this post' });
//         }

//         post.content = content;
//         await post.save();

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.deleteGroupPost = async (req, res) => {
//     const { postId } = req.params;
//     const authorId = req.user.id;

//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         // Ensure the current user is the author of the post
//         if (post.author.toString() !== authorId.toString()) {
//             return res.status(403).json({ message: 'You are not authorized to delete this post' });
//         }

//         await post.remove();
//         res.status(200).json({ message: 'Post deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


