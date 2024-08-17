const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const { sendVerificationEmail } = require('../config/mailer');
const { testMail } = require('../config/mailer');
const crypto = require('crypto');
// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// exports.registerUser = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         const user = new User({ name, email, password, role });
//         await user.save();

//         // Generate a verification token
//         const verificationToken = crypto.randomBytes(20).toString('hex');
//         user.verificationToken = verificationToken;
//         await user.save();

//         // Send verification email
//         await testMail(email, verificationToken);

//         res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Verify email
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user._id, user.role);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get current user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get current user profile by email
exports.getUserProfileByEmail = async (req, res) => {

        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user.toJSON({ virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

// Update user profile
exports.updateUserProfile = async (req, res) => {
    console.log("error check from controller");

    console.log('req_File received:', req.file);
    console.log('req_user received:', req.user);
    console.log('req_body  received:', req.body);
     // Log the file object
    const { name, email, education, profession, graduationYear, fieldOfStudy, role, company, address } = req.body;

    try {
        const user = await User.findById(req.user._id); // Use req.user._id instead of req.user.id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.education = education || user.education;
        user.profession = profession || user.profession;
        user.graduationYear = graduationYear || user.graduationYear;
        user.fieldOfStudy = fieldOfStudy || user.fieldOfStudy;
        user.address = address || user.address;
        user.company = company || user.company;
        user.role = role || user.role;

        if (req.file) {
            user.profilePicture = req.file.path; // Assuming you're storing the path locally
        }

        await user.save();

        res.json(user.toJSON({ virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// exports.updateUserProfile = async (req, res) => {
//     // console.log('File:', req)
//     const { name, email, education, profession, graduationYear, fieldOfStudy, role, company, address } = req.body;
  
//     try {
//       const user = await User.findById(req.user.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       user.name = name || user.name;
//       user.email = email || user.email;
//       user.education = education || user.education;
//       user.profession = profession || user.profession;
//       user.graduationYear = graduationYear || user.graduationYear;
//       user.fieldOfStudy = fieldOfStudy || user.fieldOfStudy;
//       user.address = address || user.address;
//       user.company = company || user.company;
//       user.role = role || user.role;
  
//       if (req.file) {
//         user.profilePicture = req.file.url; // Save the URL from Cloudinary
//       }
//       await user.save();
  
//       res.json(user.toJSON({ virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }));
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  

exports.searchAlumni = async (req, res) => {
    try {
        const { name, graduationYear, fieldOfStudy } = req.query;

        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
        }

        if (graduationYear) {
            query.graduationYear = graduationYear;
        }

        if (fieldOfStudy) {
            query.fieldOfStudy = { $regex: fieldOfStudy, $options: 'i' }; // Case-insensitive regex search
        }

        const alumni = await User.find(query);
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin-only example
exports.adminDashboard = (req, res) => {
    res.send('Admin Dashboard - Access Granted');
};













