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
router.put('/profile', protect, upload, updateUserProfile);
router.get('/search', protect, searchAlumni); 

// Admin-only route
router.get('/admin/dashboard', protect, authorize('Admin'), adminDashboard);

module.exports = router;
