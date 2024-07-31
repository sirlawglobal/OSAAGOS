const Group = require('../models/Group');

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

exports.joinGroup = async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }

        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
