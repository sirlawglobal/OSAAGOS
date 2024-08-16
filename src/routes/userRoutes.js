const express = require('express');
const { registerUser,verifyEmail , loginUser, getUserProfile, updateUserProfile,getUserProfileByEmail, adminDashboard , searchAlumni} = require('../controller/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
// const fileUpload = require('express-fileupload'); // To handle file uploads
// const uploadToCloudinary = require('./uploadToCloudinary');



router.post('/register', registerUser);
router.post('/verify', verifyEmail);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/email', getUserProfileByEmail);
// router.put('/profile', protect, upload.single('profilePicture'), updateUserProfile);
// router.put('/profile', protect, upload, updateUserProfile);
router.get('/search', protect, searchAlumni); 

// Admin-only route
router.get('/admin/dashboard', protect, authorize('Admin'), adminDashboard);
const fileUpload = require('express-fileupload');

// Middleware setup
// app.use(fileUpload());

// Route handler
router.put('/profile', protect, async (req, res) => {
    try {
        if (!req.files || !req.files.profilePicture) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files.profilePicture;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'osagoo',
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: false,
        });

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profilePicture = result.secure_url;
        await user.save();

        res.json(user.toJSON({ virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
