const express = require('express');
const { protect, admin, authorize} = require('../middleware/authMiddleware');

const {
    createNews,
    getNews,
    getNewsById,
    subscribeNewsletter,
} = require('../controller/newsController');

const router = express.Router();

router.post('/create', protect, admin, createNews);
router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/subscribe', subscribeNewsletter);

module.exports = router;
