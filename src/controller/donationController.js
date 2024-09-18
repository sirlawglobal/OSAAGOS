const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

// Create a new donation
// Create a new donation
exports.createDonation = async (req, res) => {
    const { campaignId, amount, currency } = req.body;

    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        if (!['USD', 'NGN'].includes(currency)) {
            return res.status(400).json({ message: 'Invalid currency' });
        }

        const donation = new Donation({
            user: req.user._id,
            campaign: campaignId,
            amount,
            currency
        });

        await donation.save();

        // Update the campaign's current amount based on currency
        if (currency === 'USD') {
            campaign.currentAmountUSD += amount;
        } else if (currency === 'NGN') {
            campaign.currentAmountNGN += amount;
        }

        await campaign.save();

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get donations for a campaign
// Get donations for a campaign
exports.getDonationsByCampaign = async (req, res) => {
    try {
        const donations = await Donation.find({ campaign: req.params.campaignId }).populate('user', 'name');

        // Calculate the total donation amount in USD and NGN
        const totalAmountUSD = donations
            .filter(donation => donation.currency === 'USD')
            .reduce((sum, donation) => sum + donation.amount, 0);
        const totalAmountNGN = donations
            .filter(donation => donation.currency === 'NGN')
            .reduce((sum, donation) => sum + donation.amount, 0);

        res.json({
            totalAmountRaisedUSD: totalAmountUSD,
            totalAmountRaisedNGN: totalAmountNGN,
            donations
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get donations by a user
exports.getDonationsByUser = async (req, res) => {
    try {
        const donations = await Donation.find({ user: req.user._id }).populate('campaign', 'title');

        // Calculate the total donation amount in USD and NGN
        const totalAmountUSD = donations
            .filter(donation => donation.currency === 'USD')
            .reduce((sum, donation) => sum + donation.amount, 0);
        const totalAmountNGN = donations
            .filter(donation => donation.currency === 'NGN')
            .reduce((sum, donation) => sum + donation.amount, 0);

        res.json({
            totalAmountDonatedUSD: totalAmountUSD,
            totalAmountDonatedNGN: totalAmountNGN,
            donations
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
