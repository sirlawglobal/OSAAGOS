// controllers/adminController.js
const User = require('../models/User');
const Event = require('../models/Event');
const News = require('../models/News');
const Media = require('../models/Media');


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


// Manage Media
exports.getMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMedia = await Media.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedMedia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        await Media.findByIdAndDelete(id);
        res.status(200).json({ message: 'Media item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

// Manage campaign

exports.createCampaign = async (req, res) => {
    try {
        const { title, description, targetAmount, startDate, endDate } = req.body;
        const createdBy = req.user._id; // Assuming `req.user` contains the authenticated user

        const newCampaign = new Campaign({
            title,
            description,
            targetAmount,
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
