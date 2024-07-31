const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createCampaign,
    getCampaigns,
    getCampaignById,
    updateCampaign
} = require('../controller/campaignController');
const router = express.Router();

router.post('/', protect, admin, createCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', protect, admin, updateCampaign);

module.exports = router;
