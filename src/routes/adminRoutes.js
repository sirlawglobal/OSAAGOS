

// routes/adminRoutes.js
const express = require('express');
const { protect, authorize, admin  } = require('../middleware/authMiddleware');

const {
    createAlumniProfile,
    getAlumniProfiles,
    updateAlumniProfile,
    deleteAlumniProfile,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getNews,
    createNews,
    updateNews,
    deleteNews,
    getMedia,
    updateMedia,
    deleteMedia
} = require('../controller/adminController');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

// Alumni Profiles
router.post('/alumni', createAlumniProfile);
router.get('/alumni', getAlumniProfiles);
router.put('/alumni/:id', updateAlumniProfile);
router.delete('/alumni/:id', deleteAlumniProfile);

// Events
router.get('/events', getEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// News
router.get('/news', getNews);
router.post('/news', createNews);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

// Media
router.get('/media', getMedia);
router.put('/media/:id', updateMedia);
router.delete('/media/:id', deleteMedia);

module.exports = router;
