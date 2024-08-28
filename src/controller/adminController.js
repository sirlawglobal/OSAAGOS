// controllers/adminController.js
const User = require('../models/User');
const News = require('../models/News');
const Media = require('../models/Media');
const Event = require('../models/Event');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');
const Forum = require('../models/Forum');
const Group = require('../models/Group');
const Job = require('../models/Job');
const Post = require('../models/Group_Post');

// Manage Alumni Profiles
exports.createAlumniProfile = async (req, res) => {
    const { name, email, password, graduationYear, fieldOfStudy, professionalDetails } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            role: 'Alumni',
            graduationYear,
            fieldOfStudy,
            professionalDetails
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAlumniProfiles = async (req, res) => {
    try {
        const alumni = await User.find({ role: 'Alumni' });
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
exports.getAlumniProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const alumni = await User.findById(id);

        if (!alumni || alumni.role !== 'Alumni') {
            return res.status(404).json({ message: 'Alumni profile not found' });
        }

        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateAlumniProfile = async (req, res) => {
    const { name, email,password, education, profession, graduationYear, fieldOfStudy, role, company, address } = req.body;

    try {
        const { id } = req.params;
        const updatedProfile = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteAlumniProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Alumni profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage Events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage News

// Create a new news article
exports.createNews = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const newNews = new News({
            title,
            content,
            author
        });

        const news = await newNews.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all news articles
exports.getNews = async (req, res) => {
    try {
        const news = await News.find().populate('author', 'name email');
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get a single news article by ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate('author', 'name email');
        if (!news) {
            return res.status(404).json({ error: 'News article not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Update a news article by ID
exports.updateNews = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({ error: 'News article not found' });
        }

        if (title) news.title = title;
        if (content) news.content = content;
        if (author) news.author = author;

        const updatedNews = await news.save();
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete a news article by ID
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'News article not found' });
        }

        await news.remove();
        res.status(200).json({ message: 'News article deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Manage forum
exports.createForum = async (req, res) => {
    try {
        const { title, description } = req.body;
        const createdBy = req.user._id; // Assuming `req.user` contains the authenticated user

        const newForum = new Forum({
            title,
            description,
            createdBy
        });

        const forum = await newForum.save();
        res.status(201).json(forum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getForums = async (req, res) => {
    try {
        const forums = await Forum.find().populate('createdBy', 'name email').populate('posts');
        res.status(200).json(forums);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getForumById = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id).populate('createdBy', 'name email').populate('posts');
        if (!forum) {
            return res.status(404).json({ error: 'Forum not found' });
        }
        res.status(200).json(forum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateForum = async (req, res) => {
    try {
        const { title, description } = req.body;
        const forum = await Forum.findById(req.params.id);

        if (!forum) {
            return res.status(404).json({ error: 'Forum not found' });
        }

        if (title) forum.title = title;
        if (description) forum.description = description;

        const updatedForum = await forum.save();
        res.status(200).json(updatedForum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteForum = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id);
        if (!forum) {
            return res.status(404).json({ error: 'Forum not found' });
        }

        await forum.remove();
        res.status(200).json({ message: 'Forum deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.approveForum = async (req, res) => {

    try {
        const forum = await Forum.findById(req.params.id);
        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        forum.status = 'approved';
        await forum.save();

        res.status(200).json({
            message: 'Forum approved successfully',
            forum
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.denyForum = async (req, res) => {
    const { forumId } = req.params;

    try {
        const forum = await Forum.findById(req.params.id);

        if (!forum) {
            return res.status(404).json({ message: 'Forum not found' });
        }

        forum.status = 'denied';
        await forum.save();

        res.status(200).json({
            message: 'Forum denied successfully',
            forum
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createForumPost = async (req, res) => {
    try {
        const { forumId, content } = req.body;
        const author = req.user._id; // Assuming req.user contains the authenticated user

        const newPost = new Post({
            forum: forumId,
            author,
            content,
        });

        const post = await newPost.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPostsByForum = async (req, res) => {
    const { forumId } = req.params;

    try {
        const posts = await Post.find({ forum: forumId })
            .populate('author', 'name email') // Optionally populate author details
            .sort({ timestamp: -1 }); // Sort posts by most recent

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getForumPostById = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// exports.getPostsByForum = async (req, res) => {
//     const { forumId } = req.params;

//     try {
//         const posts = await Post.find({ forum: forumId })
//             .populate('author', 'name email') // Optionally populate author details
//             .sort({ timestamp: -1 }); // Sort posts by most recent

//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

exports.updateForumPost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the authenticated user is the author
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You do not have permission to update this post' });
        }

        post.content = content;
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteForumPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the authenticated user is the author
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You do not have permission to delete this post' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Manage campaign
exports.createCampaign = async (req, res) => {
    try {
        const { title, description, targetAmount, startDate, endDate } = req.body;
        const createdBy = req.user._id; // Assuming `req.user` contains the authenticated user

        const newCampaign = new Campaign({
            title,
            description,
            targetmount,
            startDate,
            endDate,
            createdBy
        });

        const campaign = await newCampaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('createdBy', 'name email');
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate('createdBy', 'name email');
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateCampaign = async (req, res) => {
    try {
        const { title, description, targetAmount, startDate, endDate } = req.body;
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        if (title) campaign.title = title;
        if (description) campaign.description = description;
        if (targetAmount) campaign.targetAmount = targetAmount;
        if (startDate) campaign.startDate = startDate;
        if (endDate) campaign.endDate = endDate;

        const updatedCampaign = await campaign.save();
        res.status(200).json(updatedCampaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        await campaign.remove();
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Crud for donation for admin route.
// Create a new donation
exports.createDonation = async (req, res) => {
    try {
        const { campaign, amount } = req.body;
        const user = req.user._id; // Assuming `req.user` contains the authenticated user

        const newDonation = new Donation({
            user,
            campaign,
            amount
        });

        const donation = await newDonation.save();
        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all donations
exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('user', 'name email').populate('campaign', 'title');
        res.status(200).json(donations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get a single donation by ID
exports.getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id)
            .populate('user', 'name email')
            .populate('campaign', 'title');
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Update a donation by ID
exports.updateDonation = async (req, res) => {
    try {
        const { campaign, amount } = req.body;
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        if (campaign) donation.campaign = campaign;
        if (amount) donation.amount = amount;

        const updatedDonation = await donation.save();
        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete a donation by ID
exports.deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        await donation.remove();
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// CRUD FOR GROUP
// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, members, description } = req.body;

        const newGroup = new Group({
            name,
            members,
            description
        });

        const group = await newGroup.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('members', 'name email');
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get a single group by ID
exports.getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('members', 'name email');
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Update a group by ID
exports.updateGroup = async (req, res) => {
    try {
        const { name, members, description } = req.body;
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (name) group.name = name;
        if (members) group.members = members;
        if (description) group.description = description;

        const updatedGroup = await group.save();
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete a group by ID
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        await group.remove();
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.approveGroup = async (req, res) => {
    // const { groupId } = req.params.id;
// console.log("confirmed")
// console.log("groupId :", req.params.id )
// console.log("groupparam :", req.params)


    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        group.status = 'approved';
        await group.save();
        res.json({ message: 'Group approved', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.denyGroup = async (req, res) => {

    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        group.status = 'denied';
        await group.save();
        res.json({ message: 'Group denied', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.approveJoinRequest = async (req, res) => {
    const { groupId, userId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the user has actually requested to join
        const requestIndex = group.joinRequests.indexOf(userId);
        if (requestIndex === -1) {
            return res.status(400).json({ message: 'No join request from this user' });
        }

        // Move user from joinRequests to members
        group.joinRequests.splice(requestIndex, 1);
        group.members.push(userId);
        await group.save();

        res.status(200).json({ message: 'User added to group', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.denyJoinRequest = async (req, res) => {
    const { groupId, userId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the user has actually requested to join
        const requestIndex = group.joinRequests.indexOf(userId);
        if (requestIndex === -1) {
            return res.status(400).json({ message: 'No join request from this user' });
        }

        // Remove user from joinRequests
        group.joinRequests.splice(requestIndex, 1);
        await group.save();

        res.status(200).json({ message: 'Join request denied', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addMemberToGroup = async (req, res) => {
    const { groupId, userId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is already a member
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of this group' });
        }

        // Add user to members
        group.members.push(userId);
        await group.save();

        res.status(200).json({ message: 'User added to group', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMemberFromGroup = async (req, res) => {
    const { groupId, userId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is a member of the group
        const memberIndex = group.members.indexOf(userId);
        if (memberIndex === -1) {
            return res.status(400).json({ message: 'User is not a member of this group' });
        }

        // Remove user from members
        group.members.splice(memberIndex, 1);
        await group.save();

        res.status(200).json({ message: 'User removed from group', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllMembersInGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('members', 'name email');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json({ members: group.members });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Crud for post

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { forum, author, content } = req.body;

        // Validate forum and author
        const validForum = await Forum.findById(forum);
        if (!validForum) return res.status(400).json({ error: 'Invalid forum ID' });

        const validAuthor = await User.findById(author);
        if (!validAuthor) return res.status(400).json({ error: 'Invalid author ID' });

        const newPost = new Post({
            forum,
            author,
            content
        });

        const post = await newPost.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('forum', 'title').populate('author', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('forum', 'title').populate('author', 'name');
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const { forum, author, content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (forum) post.forum = forum;
        if (author) post.author = author;
        if (content) post.content = content;

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//fetch all Users(user,alumni,etc)
//fetch all user profile.
 exports.FetchUserProfile = async (req, res) => {
    try {
        const users = await User.find({}, 'name email phone role profilePicture education profession graduationYear fieldOfStudy address company');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};
//fetch all user profile.
 exports.FetchUser= async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

// Fetch all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Create a new job
exports.createJob = async (req, res) => {
    try {
        // Assuming the authenticated user ID is available in req.user.id
        const jobData = {
            ...req.body,
            postedBy: req.user.id
        };

        const newJob = new Job(jobData);
        const savedJob = await newJob.save();

        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// exports.createJob = async (req, res) => {
//     try {
//         const newJob = new Job(req.body);
//         const savedJob = await newJob.save();
//         res.status(201).json(savedJob);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


// Update a job
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage Media


// Create a new media entry

exports.createMedia = async (req, res) => {
    try {
        const { title, description, fileUrl, fileType } = req.body;

        // Assuming `req.user` contains the authenticated user's ID after the authentication middleware
        const createdBy = req.user._id;

        const newMedia = new Media({
            title,
            description,
            fileUrl,
            fileType,
            createdBy
        });

        const media = await newMedia.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get a single media entry by ID
exports.getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id).populate('createdBy', 'name email');
        if (!media) return res.status(404).json({ error: 'Media not found' });
        res.status(200).json(media);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all media entries
exports.getMedia = async (req, res) => {
    try {
        const media = await Media.find().populate('createdBy', 'name email');
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update a media entry by ID
exports.updateMedia = async (req, res) => {
    try {
        const { title, description, fileUrl, fileType } = req.body;
        const media = await Media.findById(req.params.id);

        if (!media) return res.status(404).json({ error: 'Media not found' });

        // Update only the provided fields
        if (title) media.title = title;
        if (description) media.description = description;
        if (fileUrl) media.fileUrl = fileUrl;
        if (fileType) media.fileType = fileType;

        // Optionally, you might want to update the `createdBy` field when modifying the media
        media.createdBy = req.user._id;

        const updatedMedia = await media.save();
        res.status(200).json(updatedMedia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete a media entry by ID
exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).json({ error: 'Media not found' });

        await media.remove();
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAnalytics = async (req, res) => {
    
    try {
        const totalAlumni = await User.countDocuments({ role: 'Alumni' });
        const totalEvents = await Event.countDocuments();
        const totalNews = await News.countDocuments();
        const totalMedia = await Media.countDocuments();

        console.log("analytics", totalAlumni + totalEvents + totalNews + totalMedia)
        res.status(200).json({
            totalAlumni,
            totalEvents,
            totalNews,
            totalMedia
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

