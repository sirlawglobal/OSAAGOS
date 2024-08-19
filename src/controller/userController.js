const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const { jwtSecret } = require('../config/jwt');
// const { sendVerificationEmail } = require('../config/mailer');
// const { sendVerificationEmail } = require('../config/mailer');
const { transporter } = require('../config/email');
const crypto = require('crypto');
// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
// exports.registerUser = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         const user = new User({ name, email, password, role });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


const mailgun = require("mailgun-js");
// const DOMAIN = 'your-domain.com'; // Replace with your Mailgun domain
// const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
const mg = mailgun({ apiKey:"key-911539ec-7eab417d", domain: "sandbox609197615c364f21847af2042f044dfe.mailgun.org" });

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Create and save the new user
        const user = new User({ name, email, password, role });
        await user.save();

        // Generate a verification token
        const verificationToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });

        // Generate the verification URL using environment variable or config
        const verificationUrl = `sandbox609197615c364f21847af2042f044dfe.mailgun.org/api/users/verify/${verificationToken}`;

        // Send a verification email using Mailgun

        const mailOptions = {
            from: 'no-reply@sandbox609197615c364f21847af2042f044dfe.mailgun.org', // Use your Mailgun verified domain
            to: email,
            subject: 'Email Verification',
            text: `Hello ${name},\n\nPlease verify your email by clicking on the following link: \n\n${verificationUrl}\n\nThe link will expire in 24 hours.\n\nBest Regards,\nYour Company Name`,
        };

        mg.messages().send(mailOptions, (error, body) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'User registered but email could not be sent' });
            } else {
                console.log('Verification email sent:', body);
                return res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Verify email
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;

        // Find the user and mark them as verified
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: 'Invalid token or user not found' });

        user.isVerified = true;
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

    // Fetch all users excluding admins
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email,phone, education, profession, graduationYear, fieldOfStudy, role, company, address } = req.body;

    try {
        const user = await User.findById(req.user._id); // Use req.user._id instead of req.user.id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.education = education || user.education;
        user.profession = profession || user.profession;
        user.graduationYear = graduationYear || user.graduationYear;
        user.fieldOfStudy = fieldOfStudy || user.fieldOfStudy;
        user.address = address || user.address;
        user.company = company || user.company;
        user.role = role || user.role;

        if (req.file) {
            // user.profilePicture = req.file.path || user.profilePicture; 
            // user.profilePicture = `/uploads/${req.file.filename}` || user.profilePicture;
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            user.profilePicture = `${baseUrl}/uploads/${req.file.filename}` || user.profilePicture;

            // "profilePicture": "http://localhost:5200/uploads/uploads\\profilePicture-1724047728853.jpg",
            // user.profilePicture = `/uploads/${req.file.path}` || user.profilePicture; 


// "http://localhost:5200/uploads/profilePicture-1724047866901.jpg",

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













