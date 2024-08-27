const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
        const event = new Event({ title, description, date, location });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rsvpEvent = async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.attendees.includes(userId)) {
            event.attendees.push(userId);
            await event.save();
        }

        res.json({ message: 'RSVP successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Update event fields
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.remove();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
