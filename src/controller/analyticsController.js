// controllers/analyticsController.js
const User = require('../models/User');
const Event = require('../models/Event');
const News = require('../models/News');
const Media = require('../models/Media');

exports.getAnalytics = async (req, res) => {
    try {
        const totalAlumni = await User.countDocuments({ role: 'alumni' });
        const totalEvents = await Event.countDocuments();
        const totalNews = await News.countDocuments();
        const totalMedia = await Media.countDocuments();

        res.status(200).json({
            totalAlumni,
            totalEvents,
            totalNews,
            totalMedia,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
