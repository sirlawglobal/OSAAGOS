const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { receiver, content } = req.body;
    const sender = req.user.id;

    try {
        const message = new Message({ sender, receiver, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    const userId = req.user.id;
    const { contactId } = req.query;

    try {
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: contactId },
                { sender: contactId, receiver: userId }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
