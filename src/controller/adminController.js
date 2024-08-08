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
exports.getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const newsItem = new News(req.body);
        await newsItem.save();
        res.status(201).json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await News.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await News.findByIdAndDelete(id);
        res.status(200).json({ message: 'News item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
