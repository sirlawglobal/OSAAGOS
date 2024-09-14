// controllers/mediaController.js
const Media = require('../models/Media');

exports.uploadMedia = async (req, res) => {

    console.log("req.file:", req.file)
    const { title, description, fileType } = req.body;

    try {
        const media = new Media({
            title,
            description,
            fileUrl: req.file,
            fileType,
            createdBy: req.user._id,
        });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);

        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
