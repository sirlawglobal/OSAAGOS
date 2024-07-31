const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

// Create a new donation
exports.createDonation = async (req, res) => {
    const { campaignId, amount } = req.body;

    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        const donation = new Donation({
            user: req.user._id,
            campaign: campaignId,
            amount
        });

        await donation.save();

        // Update the campaign's current amount
        campaign.currentAmount += amount;
        await campaign.save();

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get donations for a campaign
exports.getDonationsByCampaign = async (req, res) => {
    try {
        const donations = await Donation.find({ campaign: req.params.campaignId }).populate('user', 'name');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get donations by a user
exports.getDonationsByUser = async (req, res) => {
    try {
        const donations = await Donation.find({ user: req.user._id }).populate('campaign', 'title');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
