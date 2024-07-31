const Campaign = require('../models/Campaign');

// Create a new campaign
exports.createCampaign = async (req, res) => {
    const { title, description, targetAmount, startDate, endDate } = req.body;

    try {
        const campaign = new Campaign({
            title,
            description,
            targetAmount,
            startDate,
            endDate,
            createdBy: req.user._id
        });

        console.log(campaign)
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        console.log("error na here:")
        res.status(500).json({ message: error.message });
    }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('createdBy', 'name');
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate('createdBy', 'name');
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
    const { title, description, targetAmount, startDate, endDate } = req.body;

    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // Update campaign fields
        campaign.title = title || campaign.title;
        campaign.description = description || campaign.description;
        campaign.targetAmount = targetAmount || campaign.targetAmount;
        campaign.startDate = startDate || campaign.startDate;
        campaign.endDate = endDate || campaign.endDate;

        await campaign.save();
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
