const News = require('../models/News');
const Subscription = require('../models/Subscription');

exports.createNews = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;

    try {
        const news = new News({ title, content, author });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 }).populate('author', 'name');
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    const newsId = req.params.id;

    try {
        const news = await News.findById(newsId).populate('author', 'name');
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    try {
        const subscription = new Subscription({ email });
        await subscription.save();
        res.status(201).json({ message: 'Subscription successful' });
          
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
