// controllers/adminController.js
const User = require('../models/User');

const createAlumniProfile = async (req, res) => {
    const { name, email, password, graduationYear, fieldOfStudy, professionalDetails } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            role: 'alumni',
            graduationYear,
            fieldOfStudy,
            professionalDetails
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAlumniProfile = async (req, res) => {
    const { name, graduationYear, fieldOfStudy, professionalDetails } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = name || user.name;
            user.graduationYear = graduationYear || user.graduationYear;
            user.fieldOfStudy = fieldOfStudy || user.fieldOfStudy;
            user.professionalDetails = professionalDetails || user.professionalDetails;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createAlumniProfile, updateAlumniProfile };
