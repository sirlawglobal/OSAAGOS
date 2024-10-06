const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

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


exports.getDonationsByCampaign = async (req, res) => {
    try {
        const donations = await Donation.find({ campaign: req.params.campaignId }).populate('user', 'name');
        console.log(donations); // Add this to inspect the data

        // Calculate the total donation amount in USD and NGN
        const totalAmountUSD = donations
            .filter(donation => donation.currency === 'USD')
            .reduce((sum, donation) => sum + donation.amount, 0);
        const totalAmountNGN = donations
            .filter(donation => donation.currency === 'NGN')
            .reduce((sum, donation) => sum + donation.amount, 0);

            console.log("totalAmountUSD",totalAmountUSD)
        res.json({
            totalAmountRaisedUSD: `${totalAmountUSD} USD`,
            totalAmountRaisedNGN: `${totalAmountNGN} NGN`,
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

const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);


// Initialize Paystack payment
exports.initializePayment = async (req, res) => {

    const { amount, email, currency, campaignId } = req.body;

    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        const paystackAmount = currency === 'NGN' ? amount * 100 : (amount * 100 * 775); 
        // Convert USD to NGN at exchange rate

        // Initialize transaction with Paystack
    const response = await paystack.transaction.initialize({
    amount: paystackAmount,
    email: email,
    currency: currency,
    callbackUrl: `https://osaagos-api-alumni-website.onrender.com//verify-payment/${campaignId}`
});

    // callbackUrl: `http://localhost:5200/verify-payment/${campaignId}?reference=${reference}`


        // Send the authorization URL to the client to complete the payment
        console.log("response", response)
        res.status(200).json({ authorization_url: response.data.authorization_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Verify Paystack transaction
exports.verifyPayment = async (req, res) => {
    const { reference } = req.query;
    const { campaignId } = req.params;

    try {
        const response = await paystack.transaction.verify(reference);
        console.log("response.data",response)
        const { status, amount, currency, customer } = response.data;
 
        if (status === 'success') {
            const campaign = await Campaign.findById(campaignId);
            if (!campaign) {
                return res.status(404).json({ message: 'Campaign not found' });
            }

            const donation = new Donation({
                user: req.user._id,
                campaign: campaignId,
                amount: amount / 100, // Convert kobo back to NGN
                currency,
                email: customer.email
            });

            await donation.save();

            if (currency === 'USD') {
                campaign.currentAmountUSD += donation.amount;
            } else if (currency === 'NGN') {
                campaign.currentAmountNGN += donation.amount;
            }

            await campaign.save();

            res.status(200).json({ message: 'Donation successful', donation });
        } else {
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
