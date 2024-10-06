const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createDonation,
    getDonationsByCampaign,
    getDonationsByUser,
    initializePayment,
    verifyPayment
} = require('../controller/donationController');
const router = express.Router();

router.post('/', protect, createDonation);
router.get('/campaign/:campaignId', protect, getDonationsByCampaign);
router.get('/user', protect, getDonationsByUser);

router.post('/paystack/initialize',protect, initializePayment);

router.get('/verify-payment/:campaignId',protect, verifyPayment);

module.exports = router;

