const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createDonation,
    getDonationsByCampaign,
    getDonationsByUser
} = require('../controller/donationController');
const router = express.Router();

router.post('/', protect, createDonation);
router.get('/campaign/:campaignId', protect, getDonationsByCampaign);
router.get('/user', protect, getDonationsByUser);

module.exports = router;
