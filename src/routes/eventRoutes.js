const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createEvent,
    getEvents,
    getEventById,
    rsvpEvent,
} = require('../controller/eventController');
const router = express.Router();

router.post('/create', protect, createEvent);
router.get('/', protect, getEvents);
router.get('/:id', protect, getEventById);
router.post('/:id/rsvp', protect, rsvpEvent);

module.exports = router;
